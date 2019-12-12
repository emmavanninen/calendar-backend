let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: [
    {
      token: { type: String }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
