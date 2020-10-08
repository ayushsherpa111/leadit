/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { SESS_NAME, SESS_PREFIX } from "../config";
import { UserSession } from "../utils";
import cookie from "cookie";
import { Redis } from "ioredis";

export function SessionParser(store: Redis): RequestHandler {
  function checkSession(req: Request, sessID: string): void {
    if (!req.user) {
      const userSess = new UserSession(sessID, store, SESS_PREFIX);
      req.user = userSess;
    } else {
      console.log("Session already created");
    }
  }

  function Decode(cookie: string): string {
    const ckBrf = Buffer.from(cookie, "base64");
    const payload = ckBrf.toString("utf-8").split("|")[1];
    return Buffer.from(payload, "base64").toString("utf-8").slice(4).trim();
  }

  return function (req: Request, _: Response, next: NextFunction) {
    // Parse the cookie that is set in the header
    const ckObj: { [key: string]: string } = cookie.parse(
      req.headers.cookie ?? ""
    );

    // if no cookie has been set for
    if (!ckObj[SESS_NAME]) {
      req.user = null;
      return next();
    } else {
      const sessionID = Decode(ckObj[SESS_NAME]);
      checkSession(req, sessionID);
    }
    next();
  };
}
