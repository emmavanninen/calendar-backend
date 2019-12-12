var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', (req, res) => {

    userController.registerNewUser(req.body)
    .then(result => {
        console.log(`stuff got to the database`, result);
        
    })
        .catch(err => {
            res.status(err.status).json(err);
        });
})


module.exports = router;
