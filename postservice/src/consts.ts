export const PORT = parseInt(process.env.PORT ?? "5000");
export const SESS_NAME = process.env.SESS_NAME ?? "_sess_id";
export const AUTH_KEY = process.env.AUTH_KEY ?? "secret";
export const ENC_KEY = process.env.ENC_KEY ?? "enc";
export const DB_URI = process.env.DB_URI ?? "";
export const REDIS_PORT = parseInt(process.env.REDIS_PORT ?? "6379");
export const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
