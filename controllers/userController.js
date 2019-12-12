const User = require("../routes/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  registerNewUser: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email }).then(user => {
        if (user) {
          console.log("user already exists");
        } else {
          const newUser = new User(params);
          bcrypt.genSalt(10, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                reject(err);
              } else {
                newUser.password = hash;
                console.log(newUser);

                newUser
                  .save()
                  .then(user => {
                    const payload = {
                      id: user._id,
                      email: user.email
                    };
                    jwt.sign(
                      payload,
                      process.env.SECRET_KEY,
                      { expiresIn: 3600 },
                      (err, token) => {
                        if (err) {
                          reject(err);
                        } else {
                          console.log("poop3");

                          let success = {};
                          success.confirmation = true;
                          success.token = `Bearer ${token}`;
                          resolve(success);
                        }
                      }
                    );
                  })
                  .catch(error => reject(error));
              }
            });
          });
        }
      });
    }).catch(error => reject(error));
  }
};
