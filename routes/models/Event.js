let mongoose = require("mongoose");

let EventSchema = new mongoose.Schema({
  event: {
    title: { type: String, required: true },
    description: { type: String },
    dateSet: { type: Date, required: true }
  },
    dateCreated: { type: Date, required: true },
  yearmonth: { type: Number, required: true },
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Event", EventSchema);
