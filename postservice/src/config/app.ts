export const { PORT = "5000", NODE_ENV = "development" } = process.env;
export const __prod__ = NODE_ENV === "production";
