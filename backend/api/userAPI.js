var signin = require("../schema/userData");
module.exports = {
  user: function(data) {
    return new Promise((resolve, reject) => {
      signin.findOne({ email: data.email }, function(err, result) {
        if (err) {
          console.log("error 1st");
          reject(err);
        }
        if (result) {
          console.log("email exist");
          resolve("email already exist");
        } else {
          if (data.psw == data.repeat) {
            signin.create(data, function(err, result) {
              if (err) {
                reject(err);
              } else {
                console.log(data);
                resolve("successful");
              }
            });
          } else {
            resolve("enter valid Password");
          }
        }
      });
    });
  },

  users: function(data) {
    return new Promise((resolve, reject) => {
      signin.find({ email: data.email, psw: data.psw }, "email", function(
        err,
        result
      ) {
        if (err) {
          reject(err);
        } else if (result.length === 1) {
          signin.findOne({ email: data.email }, function(err, result) {
            if (err) {
              reject(err);
            } else {
              resolve("verify your email");
            }
          });
        } else {
          resolve("Check your login details");
        }
      });
    });
  },
  forgot: function(data) {
    console.log(data, "forgot");
    return new Promise((resolve, reject) => {
      signin.find({ email: data.email }, "email", function(err, result) {
        console.log("result", result);
        if (err) {
          reject(err);
        } else if (result.length === 1) {
          resolve("change password");
        } else {
          resolve("Email do not exist");
        }
      });
    });
  },
  Reset: function(data) {
    return new Promise((resolve, reject) => {
      if (data.psw == data.repeat) {
        signin.update(
          { email: data.email },
          { $set: { psw: data.psw } },
          function(err, result) {
            if (err) {
              reject(err);
            } else {
              resolve("password changed");
            }
          }
        );
      } else {
        resolve("password did not matched");
      }
    });
  }
};
