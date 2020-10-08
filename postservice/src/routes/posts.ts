import { Router, Request, Response, NextFunction } from "express";
import { Post, Category } from "../entity/Post";
import { User } from "../entity/User";
import { getManager } from "typeorm";
import { auth } from "../middleware";
import createError from "http-errors";
import { catchAsync } from "../errors";
import { validate, titleSchema, mediaSchema } from "../validation";
import {
  diskStorage,
  FILE_COUNT,
  MEDIA_STORE,
  FILE_SIZE,
  MIME_TYPES,
} from "../uploader/multer";
import multer from "multer";

const router = Router();

router.get("/", auth, (req: Request, res: Response) => {
  req.user?.session().then((val: string | null) => {
    res.json({
      data: JSON.parse(val ?? `{"err": "no user set"}`),
    });
  });
});

router.post(
  "/u/text",
  auth,
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await validate(titleSchema, req.body);
    const entityManager = getManager();
    const parsedUser = req.user?.data;
    const result = await entityManager.transaction(async (mgr) => {
      const foundUser = await mgr.findOne(User, {
        uid: parsedUser?.userid,
      });
      if (foundUser) {
        const newPost = mgr.create(Post, {
          post_title: req.body.title,
          post_data: req.body.data,
          category: Category.TEXT,
          userid: foundUser.uid,
        });
        console.log(newPost);
        await mgr.save(newPost);
        return newPost;
      }
      throw new Error("No user found. Login");
    });
    if (result) {
      return res.json({
        msg: "done",
        result,
      });
    }
    return next(createError(400, "Malformed request"));
  })
);

const fileUploader = multer({
  dest: MEDIA_STORE,
  storage: diskStorage,
  limits: {
    files: FILE_COUNT,
    fileSize: FILE_SIZE,
  },
  fileFilter: (_, file, callback) => {
    callback(null, MIME_TYPES.includes(file.mimetype));
  },
});

router.post(
  "/u/media",
  [auth, fileUploader.fields([{ name: "my_file", maxCount: 20 }])],
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Validate Schema first
    await validate(mediaSchema, req.body);
    const entityManager = getManager();
    if (req.files["my_file"].length > 0) {
      const files = req.files["my_file"]
        .map((file: Express.Multer.File) => file.filename)
        .join(",");
      const result = await entityManager.transaction(async (t_mgr) => {
        const foundUser = await t_mgr.findByIds(User, [req.user?.data?.userid]);

        if (foundUser.length > 0) {
          const post = t_mgr.create(Post, {
            post_title: req.body.title,
            post_data: files,
            category: Category.MEDIA,
            userid: foundUser[0].uid,
          });
          await t_mgr.save(post);
          return post;
        }
        throw new Error("No user found");
      });
      if (result) {
        return res.send({
          msg: "ok",
          result,
        });
      }
    }
    return next(createError(400, "Failed to save Post"));
  })
);

export default router;
