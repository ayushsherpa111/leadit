import { Router, Request, Response } from "express";
import { Sub } from "../entity/Sub";
const router = Router();
// const connection = getConnection();

router.get("/", (req: Request, res: Response) => {
  const sub = new Sub();
  sub.sub = "nice";
  res.send({
    sub,
    ses: req.session,
    cookie: req.session?.cookie,
    opts: req.sessionOptions,
  });
});

router.post("/", (req: Request, res: Response) => {
  res.send(req.body);
});

export default router;
