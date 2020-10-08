import { Redis } from "ioredis";

export interface sessionStore {
  authenticated: boolean;
  userId: string;
}

export class UserSession {
  sessionID: string;
  store: Redis;
  prefix: string;
  data: { authenticated: boolean; userid: string };
  constructor(_id: string, _str: Redis, _prefix: string) {
    this.sessionID = _id;
    this.store = _str;
    this.prefix = _prefix;
    this.data = {
      authenticated: false,
      userid: "",
    };
  }

  public session(): Promise<string> {
    return new Promise((res, rej) => {
      this.store
        .get(this.prefix + this.sessionID)
        .then((value: string | null) => {
          if (value) {
            res(value);
          } else {
            rej("User not found");
          }
        });
    });
  }
}
