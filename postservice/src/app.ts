import express from "express";
import cors from "cors";
import PostHandler from "./routes/posts";
import morgan from "morgan";
import { Redis } from "ioredis";
import { SessionParser } from "./middleware";
import { catchAll, logErrors } from "./errors";

const createApp = (rdsClient: Redis): express.Application => {
  const app = express();
  app.set("trust proxy", true);
  app.use(cors());
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  app.use(SessionParser(rdsClient));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/post", PostHandler);
  app.use(logErrors);
  app.use(catchAll);
  return app;
};

export default createApp;
