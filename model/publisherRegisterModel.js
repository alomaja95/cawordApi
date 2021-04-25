const mongoose = require("mongoose");
const registerScemal = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avaterUrl: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
});
exports.Publisher = mongoose.model("Publisher", registerScemal);
