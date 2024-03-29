//Import necessary modules or dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Make an instance of Express App
const app = express();

//Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log("Request body:");
    console.log(req.body);
  }
  next();
});

//Routes
app.use("/api/posts/", require("./src/routes/post"));
app.use("/api/users", require("./src/routes/user"));

//Connect to MongoDb or Database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB or Database.");
  })
  .catch((error) => {
    console.log("Error in connecting to MongoDB:", error.message);
  });

//Start the server
const port = process.env.PORT || "0.0.0.0:4000";
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, "::", () => console.log(`Listening on port ${port}`));
