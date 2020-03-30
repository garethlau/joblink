const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  resetPasswordToken: String,
  resetPasswordExpires: String
});

UserSchema.methods.generateHash = password => {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
};

UserSchema.methods.validPassword = (password, hash) => {
  /*
   *   @param {String}   password    Password entered by the user
   *   @param {String}   hash        Hashed password saved to the user
   */
  return bcryptjs.compareSync(password, hash);
};

module.exports = mongoose.model("User", UserSchema);
