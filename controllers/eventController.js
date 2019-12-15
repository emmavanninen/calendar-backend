const Event = require("../routes/models/Event");

module.exports = {
  createEvent: params => {
      
    let str = params.dateSet.toString().slice(0, 7);
    str = str.replace(/-/g, "");

    console.log(`str`, str);
    

    return new Promise((resolve, reject) => {
      const newEvent = new Event();
      newEvent.event.title = params.title;
      newEvent.event.description = params.desc;
      newEvent.event.dateSet = params.dateSet;
      newEvent.dateCreated = new Date();
      newEvent.yearmonth = Number(str);
        console.log(`!!`, newEvent);
        
      newEvent
        .save()
        .then(event => {
          resolve(event);
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
            resolve(result)
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

          // resolve(result)
        })
        .catch(err => reject(err));
    });
  }
};
