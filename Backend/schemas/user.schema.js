const Joi = require("joi");

const userSchema = Joi.object({
  userId: Joi.string().required(),
  favoritePics: Joi.object ({
    title: Joi.string().required(),
    byteSize: Joi.number().required(),
    imageUrl: Joi.string().required(),
  }).required()
});

module.exports = { userSchema };
