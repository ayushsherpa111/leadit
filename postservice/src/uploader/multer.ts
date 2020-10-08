import multer from "multer";
import { randomBytes } from "crypto";

export const MEDIA_STORE = "public/posts/";
export const FILE_COUNT = 20;
export const FILE_SIZE = 8 * (1 << 20);
export const MIME_TYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "video/mp4",
  "video/quicktime",
];

export const diskStorage = multer.diskStorage({
  destination: function (_, file, cb) {
    cb(null, MEDIA_STORE);
  },
  filename: function (_, file, cb) {
    const extension = file.originalname.split(".").splice(-1)[0];
    const uniqueFile = randomBytes(16).toString("hex");
    cb(null, uniqueFile + "." + extension);
  },
});
