const Joi = require("joi");

const userSchema = Joi.object({
  userId: Joi.string(),
  favoritePics: Joi.object().keys({
    title: Joi.string().required,
    byteSize: Joi.number().required,
    imageUrl: Joi.string().required,
  }),
});

module.exports = { userSchema };
