const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const user = require("./Model/model");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL);

const databaseConn = mongoose.connection;

databaseConn.on("error", (error) => {
  console.log(error);
});

databaseConn.once("connected", () => {
  console.log("db connected");
});

app.get("/users", async (req, res) => {
  try {
    const result = await user.find();
    res.status(200).json({ message: "success", result: result });
  } catch (error) {
    res.status(400).json({ message: "fail", error: error });
  }
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await user.findById(id);
    res.status(200).json({ message: "success", result: result });
  } catch (error) {
    res.status(400).json({ message: "fail", error: error });
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await user.findByIdAndDelete(id);
    res.status(200).json({ message: "success", result: result });
  } catch (error) {
    res.status(400).json({ message: "fail", error: error });
  }
});

app.post("/add", async (req, res) => {
  const email = req.body.email;
  const userName = req.body.userName;
  const mobileNumber = req.body.mobileNumber;
  const userData = new user({
    email: email,
    userName: userName,
    mobileNumber: mobileNumber,
    createdTime: new Date(),
  });
  try {
    const result = await userData.save();
    res.status(200).json({ message: "success", result: result });
  } catch (err) {
    res.status(400).json({ message: "fail", error: err });
  }
});

app.put("/update", async (req, res) => {
  const id = req.body._id;
  const email = req.body.email;
  const userName = req.body.userName;
  const mobileNumber = req.body.mobileNumber;
  const options = { new: true };
  const updatedData = {
    email: email,
    userName: userName,
    mobileNumber: mobileNumber,
  };

  try {
    const result = await user.findByIdAndUpdate(id, updatedData, options);
    res.status(200).json({ message: "success", result: result });
  } catch (error) {
    res.status(400).json({ message: "fail", error: error });
  }
});

app.listen(process.env.PORT || 4001, () => {
  console.log("The server start", process.env.PORT);
});
