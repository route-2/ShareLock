const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
      },
      location: {
        type: String,
        required: true,
        trim: true
      }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;