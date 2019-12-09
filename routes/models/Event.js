let mongoose = require("mongoose");

let EventSchema = new mongoose.Schema({
    event: {
        title: { type: String, required: true },
        descprition: { type: String, default: '' },
        date: { type: Date, required: true },
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Event", EventSchema);
