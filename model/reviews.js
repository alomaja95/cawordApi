const mongooes = require("mongoose");
const reviewSchema = mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 1,
  },
  bookId: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "PublishBook",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
exports.Reviews = mongooes.model("Reviews", reviewSchema);
