const getAllpictures = (req, res) => {
  res.status(201).json("There you go");
};
const sendInPictures = (req, res) => {
  const body = req.body;
  res.set("Content-Type", "text/plain");
  res.send(`You sent: ${body} to Express`);
};
module.exports = { getAllpictures, sendInPictures };
