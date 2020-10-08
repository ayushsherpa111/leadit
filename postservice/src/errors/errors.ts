import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpError } from "http-errors";

export function logErrors(
  err: Error,
  req: Request,
  _: Response,
  next: NextFunction
): void {
  console.error(err.stack);
  console.log(`[${req.baseUrl}] - ${req.method} (${req.statusCode})`);
  next(err);
}

// eslint-disable @typescript-eslint/no-unused-vars
export function catchAll(
  err: HttpError,
  _: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(err.status ?? 500).send({ msg: err.message });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const catchAsync = (handler: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => {
  return handler(...args).catch(args[2]);
};
