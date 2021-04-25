const { Router } = require("express");
const express = require("express");
const { User } = require("../model/userSchemalModel");
const router = express.Router();
const bycrpt = require("bcrypt");
router.post("/", (req, res) => {
  const password = bycrpt.hashSync(req.body.password, 10);
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValidate = re.test(String(req.body.email).toLowerCase());

  if (emailValidate) {
    const userDetails = new User({
      fullName: req.body.fullName,
      displayName: req.body.displayName,
      email: req.body.email,
      passwordHash: password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    });
    User.findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          userDetails
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Registration successful",
                success: true,
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: error.message,
                success: false,
              });
            });
        } else {
          res.status(400).json({
            message: "A user with this email address already exist.",
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
  } else {
    res.status(400).json({
      message: "The email address is invalid",
      success: false,
    });
  }
});
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        console.log(result.passwordHash);
        if (
          result.email &&
          bycrpt.compareSync(req.body.password, result.passwordHash)
        ) {
          res.status(201).json({
            message: result,
            success: true,
          });
        } else {
          res.status(404).json({
            message: "Invalid credentials.",
            success: false,
          });
        }
      } else {
        res.status(404).json({
          message: "User with this email address does not exist",
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
router.get("/profile/user/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "not foound",
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
router.put("/profile/update/:userId", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      fullName: req.body.fullName,
      displayName: req.body.displayName,
      email: req.body.email,
      passwordHash: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
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
router.put("/profile/update/password/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (
        result &&
        bycrpt.compareSync(req.body.oldPassword, result.passwordHash)
      ) {
        User.findByIdAndUpdate(
          req.params.userId,
          {
            passwordHash: bycrpt.hashSync(req.body.password, 10),
          },
          { new: true }
        )
          .then((result) => {
            if (result) {
              res.status(201).json({
                message: "password updated successful",
                success: true,
              });
            } else {
              res.status(404).json({
                message: "record not found.",
                success: true,
              });
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
              success: false,
            });
          });
      } else {
        res.status(401).json({
          message: "the password does not match with the old one.",
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
