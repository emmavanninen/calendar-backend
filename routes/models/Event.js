let mongoose = require("mongoose");

let EventSchema = new mongoose.Schema({
  event: {
    title: { type: String, required: true },
    description: { type: String },
    dateSet: { type: Date, required: true }
  },
  dateCreated: { type: Date, required: true },
  createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  yearmonth: { type: Number, required: true }
});

module.exports = mongoose.model("Event", EventSchema);
