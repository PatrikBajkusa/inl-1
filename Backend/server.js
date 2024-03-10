const express = require("express");
const cors = require("cors");
const app = express();
const imagesRouter = require("./routers/images.router");


app.use(cors());
//Middleware
app.use(express.json());
//Router
app.use("/users", imagesRouter);

app.listen(3000, () => console.log("Hello World"));
