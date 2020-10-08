import { UserSession } from "../../src/utils/session";
declare module "express-serve-static-core" {
  interface Request {
    user: UserSession | null;
  }
}
