import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

export const auth = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user) {
    const value = await req.user?.session();
    if (value) {
      req.user.data = JSON.parse(value);
      return next();
    }
  }
  return next(createError(401, "Login"));
};
