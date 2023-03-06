require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/books", require("./routes/book-routes")); // localhost:5000/books
app.use("/auth", require("./routes/auth-routes")); // localhost:5000/auth

mongoose
  .connect(
    "mongodb+srv://ourdatabase:232268@cluster0.umvz8ra.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));