import joi from "joi";

export const exitSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  user: joi.object().required(),
  time: joi.string(),
  type: joi.string(),
});
