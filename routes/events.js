const express = require("express");
const router = express.Router();
// const passport = require("passport");
const eventController = require("../controllers/eventController");

router.get('/', (req, res) => {
   res.send('poop')
})

module.exports = router;