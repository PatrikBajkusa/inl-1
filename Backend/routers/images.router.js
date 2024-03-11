const express = require("express");
const { userSchema } = require("../schemas/user.schema");
const fs = require("fs");

const router = express.Router();

const users = [];
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading data.json:", err);
  } else {
    users.push(...JSON.parse(data));
  }
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(users.filter((user) => user.userId === userId));
});
router.post("/:id", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }

  users.push(req.body);
  fs.writeFile("data.json", JSON.stringify(users) , (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(201).json(users);
    }
  });

  res.status(201).json(users);
});

module.exports = router;
