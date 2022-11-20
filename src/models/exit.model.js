import joi from "joi";

export const exitSchema = joi.object({
  value: joi.string().required(),
  description: joi.string().required(),
  user: joi.object().required(),
});
