import joi from "joi";

export const entriesSchema = joi.object({
  value: joi.string().required(),
  description: joi.string().required(),
  user: joi.object().required(),
});
