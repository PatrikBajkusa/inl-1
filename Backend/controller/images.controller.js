const { userSchema } = require("../schemas/user.schema");

const users = [];

const getAllpictures = (req, res) => {
  res.status(201).json(users);
};
const sendInPictures = (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json(error);
  }
  users.push(req.body);
  res.status(201).json(users);
};

module.exports = { getAllpictures, sendInPictures };
