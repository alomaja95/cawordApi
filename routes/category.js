const mongooes = require("mongoose");
const express = require("express");
const { Category } = require("../model/categoryModel");
const { PublishBook } = require("../model/publishbooksSchema");
const { query } = require("express");

const router = express.Router();
router.post("/", (req, res) => {
  if (req.user.publisher) {
    res.status(400).json({
      message: "un authorize user",
      success: false,
    });
  } else {
    const categoryList = new Category({
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
    });
    categoryList
      .save()
      .then((result) => {
        res.status(201).json({
          message: result,
          success: true,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
          success: false,
        });
      });
  }
});
router.get("/", (req, res) => {
  Category.find()
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "no record found",
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
router.get("/:id", (req, res) => {
  Category.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "no record found",
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
router.put("/:id", (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  )
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "no record found",
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
router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: "category has been deleted",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "no record found",
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
