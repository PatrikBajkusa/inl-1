const express = require("express");

const router = express.Router();
const users = [];

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(users.filter((user) => user.userId === userId));
});
router.post("/:id", (req, res) => {
  users.push(req.body);
  res.status(201).json(users);
});

module.exports = router;
