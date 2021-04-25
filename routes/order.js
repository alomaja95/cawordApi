const express = require("express");
const { Order } = require("../model/orderModel");
const router = express.Router();
router.post("/", (req, res) => {
  const orderList = new Order({
    amountPaid: req.body.amountPaid,
    bookId: req.body.bookId,
    buyerId: req.body.buyerId,
    transactionDate: req.body.transactionDate,
    status: req.body.status,
    transactionName: req.body.transactionName,
    bankName: req.body.bankName,
    paymentType: req.body.paymentType,
    userId: req.body.userId,
  });
  orderList
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message:
          "Request successful book will be availabe once order is confimed ",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});
router.get("/user/order/:buyerId", (req, res) => {
  const { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  Order.find({ buyerId: req.params.buyerId })
    .populate("bookId")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    });
});
router.get("/get/count/order/:id", async (req, res) => {
  const getUserOrder = await Order.find({
    buyerId: req.params.id,
  }).countDocuments((count) => count);
  if (getUserOrder) {
    res.status(201).json({
      message: getUserOrder,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "not found",
      success: false,
    });
  }
});
router.get("/user/order/publisher/:buyerId", (req, res) => {
  const { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  Order.find({ userId: req.params.buyerId })
    .populate("bookId")
    .populate("buyerId")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    });
});
router.get("/get/count/order/publisher/:id", async (req, res) => {
  const getUserOrder = await Order.find({
    userId: req.params.id,
  }).countDocuments((count) => count);
  if (getUserOrder) {
    res.status(201).json({
      message: getUserOrder,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "not found",
      success: false,
    });
  }
});
router.get("/user/book/:buyerId", (req, res) => {
  const { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  Order.find({ buyerId: req.params.buyerId, status: "success" })
    .populate("bookId")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    });
});
router.get("/get/count/order/book/:id", async (req, res) => {
  const getUserOrder = await Order.find({
    buyerId: req.params.id,
    status: "success",
  }).countDocuments((count) => count);
  if (getUserOrder) {
    res.status(201).json({
      message: getUserOrder,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "not found",
      success: false,
    });
  }
});
router.delete("/order/delete/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: "Order deleted successful.",
          success: true,
        });
      } else {
        res.status(401).json({
          message: "order not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    });
});
module.exports = router;
