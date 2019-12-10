let mongoose = require("mongoose");

let EventSchema = new mongoose.Schema({
  event: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
  },
  month: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Event", EventSchema);
