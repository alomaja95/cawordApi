const mongooes = require("mongoose");
const orderSchema = mongooes.Schema({
  amountPaid: {
    type: String,
    required: true,
  },
  bookId: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "PublishBook",
    required: true,
  },

  buyerId: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  transactionName: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
exports.Order = mongooes.model("Order", orderSchema);
