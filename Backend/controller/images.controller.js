const { userSchema } = require("../schemas/user.schema");

const users = [];

const getAllpictures = (req, res) => {
  res.status(201).json(users);
};
const sendInPictures = (req, res) => {
  
  users.push(req.body);
  res.status(201).json(users);
};

module.exports = { getAllpictures, sendInPictures };
