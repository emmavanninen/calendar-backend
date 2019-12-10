const Event = require("../routes/models/Event");

module.exports = {
  createEvent: params => {
    console.log(`params`, typeof params.date);

    let str = params.date.slice(0, 7);
    str = str.replace(/-/g, "");

    return new Promise((resolve, reject) => {
      const newEvent = new Event();
      newEvent.event.title = params.title;
      newEvent.event.description = params.desc;
      newEvent.event.date = params.date;
      newEvent.yearmonth = Number(str)

        console.log(`newevent`, newEvent);
        
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
      Event.findOne({ month: month })
        .then(events => resolve(events))
        .catch(err => reject(err));
    });
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
