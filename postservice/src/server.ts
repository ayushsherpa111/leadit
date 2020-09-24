import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import PostHandler from "./routes/posts";
import {
  PORT,
  SESS_NAME,
  AUTH_KEY,
  DB_URI,
  REDIS_PORT,
  REDIS_HOST,
} from "./consts";
import morgan from "morgan";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";

const main = async () => {
  try {
    const app = express();
    const connection = await createConnection({
      type: "postgres",
      url: DB_URI,
      synchronize: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migrations/**/*.ts"],
    });
    console.log(connection.options);
    console.log(SESS_NAME);

    const RedisStore = connectRedis(session);
    const redisClient = new Redis({
      port: REDIS_PORT,
      host: REDIS_HOST,
    });
    redisClient.get(
      "session_CK74XSDF4FG6WKMTJ35AIHG3BYEFNPES5JH6WTXD7KANYC6DZD6Q",
      (err, res) => {
        console.log(err);
        if (res) {
          console.log(res);
        }
      }
    );
    app.set("trust proxy", true);
    app.use(cors());
    app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
    app.use(
      session({
        name: SESS_NAME,
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        secret: AUTH_KEY,
        cookie: {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          path: "/",
        },
        rolling: true,
        saveUninitialized: false,
        resave: false,
      })
    );
    app.use("/post", PostHandler);
    app.get("/data/:sess", (req: Request, res: Response) => {
      redisClient.get(req.params.sess, (err, data) => {
        if (err) {
          res.json({ err });
        } else {
          res.json({ data: JSON.parse(data ?? "") });
        }
      });
    });
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

main().catch(console.error);
