const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  publishId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publisher" }],
});
exports.Category = mongoose.model("Category", categorySchema);
