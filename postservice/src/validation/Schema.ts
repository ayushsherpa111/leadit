import joi from "@hapi/joi";

const title = joi.string().min(1).max(300).trim().required();

const body = joi.string().max(1000).trim().optional();

export const titleSchema = joi.object({
  title,
  body,
});

export const mediaSchema = joi.object({
  title,
});
