var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res) => {
  userController
    .registerNewUser(req.body)
    .then(user => {
      console.log(`stuff got to the database`, user);
      res.send(user);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

router.post("/login", (req, res) => {
  userController
    .userLogin(req.body)
    .then(user => {
      console.log(`we here?`, user);
      res.send(user);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

module.exports = router;
