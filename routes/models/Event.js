let mongoose = require("mongoose");

let EventSchema = new mongoose.Schema({
  event: {
    title: { type: String, required: true },
    description: { type: String },
    dateSet: { type: Date, required: true }
  },
  dateCreated: { type: Date, required: true },
  //TODO: fix to User later
  createdByUser: { type: String, required: true },
  yearmonth: { type: Number, required: true }
});

module.exports = mongoose.model("Event", EventSchema);
