const express = require("express");

const {
  getAllpictures,
  sendInPictures,
} = require("../controller/images.controller");

const router = express.Router();

router.post("/:id", sendInPictures);
router.get("/:id", getAllpictures);

module.exports = router;
