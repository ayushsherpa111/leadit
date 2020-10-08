import { Schema } from "@hapi/joi";
import createError from "http-errors";

export const validate = async (schema: Schema, body: any): Promise<void> => {
  try {
    await schema.validateAsync(body, { abortEarly: true });
  } catch (e) {
    throw createError(401, e);
  }
};
