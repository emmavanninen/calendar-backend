const Event = require("../routes/models/Event");
const User = require("../routes/models/User");

module.exports = {
  createEvent: params => {
    return new Promise((resolve, reject) => {
      let str = params.year.toString() + params.month.toString();

      console.log(`params`, params);
      User.findOne({ email: params.user })
        .then(user => {
          if (user) {
            console.log(`user`, user);

            const newEvent = new Event();
            newEvent.event.title = params.title;
            newEvent.event.description = params.desc;
            newEvent.event.dateSet = params.dateSet;
            newEvent.dateCreated = new Date();
            newEvent.createdByUser = user;
            newEvent.yearmonth = Number(str);

            console.log(`newEvent`, newEvent);

            newEvent
              .save()
              .then(event => {
                resolve(event);
              })
              .catch(err => reject(err));
          } else reject(err);
        })
        .catch(err => reject(err));
    });
  },

  getAllMonthlyEvents: params => {
    return new Promise((resolve, reject) => {
      Event.find({ yearmonth: params.yearmonth })
        .then(events => resolve(events))
        .catch(err => reject(err));
    });
  },

  deleteEvent: params => {
    return new Promise((resolve, reject) => {
      Event.findByIdAndDelete(params.id)
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    });
  },

  editEvent: params => {
    return new Promise((resolve, reject) => {
      Event.findById(params.id)
        .then(event => {
          if (!params.title) {
            event.event.description = params.desc;
          } else if (!params.desc) {
            event.event.title = params.title;
          } else {
            event.event.title = params.title;
            event.event.description = params.desc;
          }

          event
            .save()
            .then(result => {
              resolve(result);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};
