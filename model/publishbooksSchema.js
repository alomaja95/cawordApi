const mongoose = require("mongoose");
const bookPublishSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
    default: "",
  },
  language: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  audio: {
    type: String,
    default: "",
  },
  richAudio: {
    type: String,
    default: "",
  },
  bookFile: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  newArrival: {
    type: Boolean,
    default: false,
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
});
exports.PublishBook = mongoose.model("PublishBook", bookPublishSchema);
