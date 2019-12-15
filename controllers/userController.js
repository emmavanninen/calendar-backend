const User = require("../routes/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  registerNewUser: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email }).then(user => {
        if (user) {
          //TODO: give proper error
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
                        //    console.log("token1", token);
                        if (err) {
                          reject(err);
                        } else {
                          let success = {};
                          success.confirmation = true;
                          success.token = `Bearer ${token}`;
                          user.token.push({token: token})
                          user.save()
                          .then(resolve(user))
                        //   resolve(success);
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
  },

  userLogin: params => {
    console.log(`params`, params);

    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then(user => {
          if (user) {
             bcrypt
               .compare(params.password, user.password)
               .then(isMatch => {
                 if (isMatch) {
                   const payload = {
                     id: user.id,
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
                         let success = {};
                         success.confirmation = true;
                         success.token = `Bearer ${token}`;
                         resolve(success);
                       }
                     }
                   );
                 } else {
                   let errors = {};
                   errors.message = "Incorrect email or password";
                   errors.status = 400;
                   reject(errors);
                 }
               })
               .catch(error => {
                 reject(error);
               });
          } else {
            //TODO: give proper error
            console.log("no such user");
          }
        })
        .catch(error => reject(error));
    });
  },

  userLogout: params => {
      console.log(`params`, params);

    return new Promise((resolve, reject) => {
        User.findOne({ email: params.email })
          .then(user => {
            if(user) {

            } else {

            }

          })
          .catch(error => reject(error));
    })
  }
};