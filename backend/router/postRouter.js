var express = require("express");
var postRouter = express.Router();
var upload = require("../schema/postData");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
console.log("we are on postRouter.js");
var userapi = require("../api/postAPI");

postRouter.post(
  "/upload",
  (req, res, next) => {
    next();
  },
  upload.single("avatar"),
  async function(req, res) {
    try {
      let data = req.body;
      data.date = new Date();
      data.fileName = req.file.originalname;
      let resultOfUpload = await userapi.Upload(data);
      res.send(resultOfUpload);
    } catch (err) {
      res.send(err);
    }
  }
);

postRouter.get("/onload", async function(req, res) {
  try {
    let resultOfOnload = await userapi.Onload();
    res.send(resultOfOnload);
  } catch (err) {
    res.send(err);
  }
});

postRouter.post("/manageLikes", async function(req, res) {
  try {
    console.log("managelikes", req.body);
    let resultOfLikes = await userapi.Likes(req.body);
    if (resultOfLikes.length === 1) {
      console.log("email exist");
      await userapi.ManageLikesPull(req.body);
    } else {
      console.log("not exist");
      await userapi.ManageLikes(req.body);
    }
    let resultOfManage = await userapi.Manage(req.body);

    res.send(resultOfManage);
  } catch (err) {
    res.send(err);
  }
});

postRouter.post("/manageUnlike", async function(req, res) {
  try {
    console.log(req.body);
    let resultOfUnlikes = await userapi.Unlikes(req.body);
    if (resultOfUnlikes.length === 1) {
      await userapi.ManageUnlikesPull(req.body);
    } else {
      await userapi.ManageUnlike(req.body);
    }
    let resultOfManage = await userapi.Manage(req.body);

    res.send(resultOfManage);
  } catch (err) {
    res.send(err);
  }
});

postRouter.post("/manageComments", async function(req, res) {
  try {
    await userapi.ManageComments(req.body);
    let resultOfCommentFind = await userapi.ManageCommentsFind(req.body);
    res.send(resultOfCommentFind);
  } catch (err) {
    res.send(err);
  }
});

postRouter.post("/manageComment", async function(req, res) {
  try {
    let resultOfCommentFind = await userapi.ManageCommentsFind(req.body);
    res.send(resultOfCommentFind);
  } catch (err) {
    res.send(err);
  }
});
module.exports = postRouter;
