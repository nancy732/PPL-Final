var express = require("express");
var categoryRouter = express.Router();
var userapi = require("../api/categoryAPI");

categoryRouter.post("/category", async function(req, res) {
  try {
    await userapi.ManageCategory(req.body);
    let resultOfOnloadCategory = await userapi.OnloadCategory();
    res.send(resultOfOnloadCategory);
  } catch (err) {
    res.send(err);
  }
});

categoryRouter.get("/OnloadCategory", async function(req, res) {
  try {
    let resultOfOnloadCategory = await userapi.OnloadCategory();
    res.send(resultOfOnloadCategory);
  } catch (err) {
    res.send(err);
  }
});

module.exports = categoryRouter;
