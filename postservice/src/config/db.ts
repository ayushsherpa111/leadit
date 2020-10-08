import { ConnectionOptions, DatabaseType } from "typeorm";
import { __prod__ } from "./app";

export const {
  DB_URI = "postgres://root:root@localhost:5437/loginS",
} = process.env;
const DB_TYPE: DatabaseType = "postgres";

export const DB_OPTION: ConnectionOptions = {
  type: DB_TYPE,
  logging: !__prod__,
  url: DB_URI,
  synchronize: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
};
