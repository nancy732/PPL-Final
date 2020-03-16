var express = require("express");
var userRouter = express.Router();
var userapi = require("../api/userAPI");

userRouter.post("/user", async function(req, res) {
  data = req.body;
  try {
    let resFromAPI = await userapi.user(data);
    res.send(resFromAPI);
  } catch (err) {
    res.send(err);
  }
});

userRouter.post("/users", async function(req, res) {
  console.log("data", req.body);
  try {
    let resultFromAPI = await userapi.users(req.body);
    console.log(resultFromAPI);
    res.send(resultFromAPI);
  } catch (err) {
    res.send(err);
  }
});

userRouter.post("/forgot", async function(req, res) {
  try {
    let resultOfForgot = await userapi.forgot(req.body);
    res.send(resultOfForgot);
  } catch (err) {
    res.send(err);
  }
});

userRouter.post("/reset", async function(req, res) {
  try {
    console.log("data", req.body);
    let resultOfReset = await userapi.Reset(req.body);
    res.send(resultOfReset);
  } catch (err) {
    res.send(err);
  }
});
module.exports = userRouter;
