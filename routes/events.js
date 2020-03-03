const express = require("express");
const router = express.Router();
const passport = require("passport");
const eventController = require("../controllers/eventController");

router.get("/", (req, res) => {
  //! GET request doesn't have req.body
  eventController
    .getAllMonthlyEvents(req.query)
    .then(events => {
        
      res.send(events);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

router.post("/createevent", passport.authenticate("jwt", { session: false }), (req, res) => {
    
  eventController
    .createEvent(req.body)
    .then(event => {
      res.send(event);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

router.delete("/delete:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  eventController
    .deleteEvent(req.params)
    .then(result => {
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});


router.put("/editevent", passport.authenticate("jwt", { session: false }), (req, res) => {
  eventController
    .editEvent(req.body)
    .then(event => {
      res.send(event);
    })
    .catch(err => {
      res.status(err.status).json(err);
    });
});

module.exports = router;
