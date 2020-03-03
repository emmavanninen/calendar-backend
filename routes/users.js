var express = require('express')
var router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/register', (req, res) => {
  userController
    .registerNewUser(req.body)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

router.post('/login', (req, res) => {
  userController
    .userLogin(req.body)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

router.post('/logout', (req, res) => {
  userController
    .userLogout(req.body)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

module.exports = router
