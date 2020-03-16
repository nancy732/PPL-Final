var upload = require("../schema/postData");
module.exports = {
  Upload: function(data) {
    return new Promise((resolve, reject) => {
      console.log("data", data);
      upload.create(data, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("post");
          resolve(data);
        }
      });
    });
  },
  Onload: function() {
    return new Promise((resolve, reject) => {
      upload.find({}, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  },
  Manage: function(data) {
    return new Promise((resolve, reject) => {
      upload.find({ _id: data._id }, { _id: 0, like: 1, unlike: 1 }, function(
        err,
        result
      ) {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  },
  Likes: function(data) {
    return new Promise((resolve, reject) => {
      upload.find({ _id: data._id, like: data.email }, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("Likes ", result);
          resolve(result);
        }
      });
    });
  },
  ManageLikes: function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $push: { like: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageLikesPull: function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $pull: { like: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  Unlikes: function(data) {
    return new Promise((resolve, reject) => {
      upload.find({ _id: data._id, unlike: data.email }, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("Unlikes ", result);
          resolve(result);
        }
      });
    });
  },
  ManageUnlikesPull: function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $pull: { unlike: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageUnlike: function(data) {
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $push: { unlike: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageComments: function(data) {
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $push: { comment: data.comment, commentMail: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageCommentsFind: function(data) {
    return new Promise((resolve, reject) => {
      upload.find(
        { _id: data._id },
        { _id: 0, comment: 1, commentMail: 1 },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  }
};
