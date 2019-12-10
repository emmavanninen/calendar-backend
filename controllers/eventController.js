const Event = require("../routes/models/Event");

module.exports = {
  createEvent: params => {
    return new Promise((resolve, reject) => {
      const newEvent = new Event();

      newEvent.event.title = params.event;
      newEvent.event.description = params.description;
      //   TODO: set date
      //   newEvent.date = params.date;
       newEvent.month = 
       
       
       
      console.log(`poop`, newEvent);
      newEvent
        .save()
        .then(event => {
          resolve(event);
        })
        .catch(err => reject(err));
    });
  },

  getAllMonthlyEvents: month => {
      console.log(`month`, month);
      
    return new Promise((resolve, reject) => {
      Event.findOne({month: month})
        .then(events => resolve(events))
        .catch(err => reject(err));
    })
  },

  editEvent: params => {
    return new Promise((resolve, reject) => {
      Event.findByIdAndUpdate(
        params.id,
        { todo: params.editedTodo },
        { new: true }
      )
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};
