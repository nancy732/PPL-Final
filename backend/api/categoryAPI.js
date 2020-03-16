var Category = require("../schema/category");
module.exports = {
  ManageCategory: function(data) {
    return new Promise((resolve, reject) => {
      console.log("data", data);
      Category.update(
        {},
        { $addToSet: { category: data.category } },
        { upsert: true },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log("post");
            resolve(result);
          }
        }
      );
    });
  },
  OnloadCategory: function() {
    return new Promise((resolve, reject) => {
      Category.find({}, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("category", result);
          resolve(result);
        }
      });
    });
  }
};
