import { SessionOptions } from "express-session";
import { __prod__ } from "./app";

export const {
  SESS_NAME = "_sess_id",
  SESS_PREFIX = "session_",
  AUTH_KEY = "secret",
  ENC_KEY = "enc",
} = process.env;

export const SESSION_OPTS: SessionOptions = {
  name: SESS_NAME,
  secret: [AUTH_KEY],
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    path: "/",
    secure: __prod__,
    signed: true,
  },
  proxy: true,
  rolling: true,
  saveUninitialized: false,
  resave: false,
};
