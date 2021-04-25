const express = require("express");
const app = express();
const mongooes = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const morgan = require("morgan");
const usersRouter = require("./routes/regandloginRoute");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
const api = process.env.API;
const authJwt = require("./helper/jwt");
const errorHandling = require("./helper/autherrorHandling");
const port = process.env.port || 3000;
const db = process.env.CONNECT_MONGODB;
const categoryRouter = require("./routes/category");
const publishBookRouter = require("./routes/publish");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const reviewsRouter = require("./routes/reviews");
app.use(authJwt());
app.use("/books/images", express.static(__dirname + "/books/images"));
app.use("/books/audios", express.static(__dirname + "/books/audios"));
app.use("/books/pdfs", express.static(__dirname + "/books/pdfs"));
app.use("/books/avater", express.static(__dirname + "/books/avater"));
app.use(errorHandling);
app.use(`${api}/users/`, usersRouter);
app.use(`${api}/category/`, categoryRouter);
app.use(`${api}/publish/`, publishBookRouter);
app.use(`${api}/user/`, userRouter);
app.use(`${api}/order/`, orderRouter);
app.use(`${api}/reviews/`, reviewsRouter);
mongooes
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("your database has been connected !!!");
  })
  .catch((error) => {
    console.log(error.message);
  });
app.listen(port, () => {
  console.log("you are running on port " + port);
});
