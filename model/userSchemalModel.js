const mongooes = require("mongoose");
const userRegister = mongooes.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
});
exports.User = mongooes.model("User", userRegister);
