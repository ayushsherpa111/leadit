import { RedisOptions } from "ioredis";
export const { REDIS_PORT = 6379, REDIS_HOST = "localhost" } = process.env;

export const REDIS_SETTING: RedisOptions = {
  port: +REDIS_PORT,
  host: REDIS_HOST,
};
