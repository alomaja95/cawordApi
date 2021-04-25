const { json } = require("body-parser");
const express = require("express");
const { Reviews } = require("../model/reviews");
const { User } = require("../model/userSchemalModel");

const router = express.Router();
router.post("/", (req, res) => {
  const reviewDetails = new Reviews({
    name: req.body.name,
    comment: req.body.comment,
    email: req.body.email,
    rating: req.body.rating,
    bookId: req.body.bookId,
  });
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        reviewDetails
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Your review is successful.",
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
        res.status(404).json({
          message: "Please login to add review or invalid email address.",
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
router.get("/get/count/one/rating/:id", async (req, res) => {
  const oneStar = await Reviews.find({
    bookId: req.params.id,
  });
  if (oneStar) {
    const totalRating = oneStar.length;
    const getOneStar = oneStar.filter((one) => one.rating === 1);
    const getTwoStar = oneStar.filter((one) => one.rating === 2);
    const getThreeStar = oneStar.filter((one) => one.rating === 3);
    const getFourStar = oneStar.filter((one) => one.rating === 4);
    const getFiveStar = oneStar.filter((one) => one.rating === 5);
    // const perOne = (getOneStar.length / totalRating) * 100;
    // const perTwo = (getTwoStar.length / totalRating) * 100;
    // const perThree = (getThreeStar.length / totalRating) * 100;
    // const perFour = (getFourStar.length / totalRating) * 100;
    // const perFive = (getFiveStar.length / totalRating) * 100;
    const getTotalSum = oneStar.reduce((accm, nuber) => accm + nuber.rating, 0);
    res.status(201).json({
      message: {
        one: getOneStar.length,
        two: getTwoStar.length,
        three: getThreeStar.length,
        four: getFourStar.length,
        five: getFiveStar.length,
        total: totalRating,
        avgRating: getTotalSum / totalRating,
      },
      success: true,
    });
  } else {
    res.status(404).json({
      message: "not found",
      success: false,
    });
  }
});
router.get("/comment/:id", (req, res) => {
  Reviews.find({ bookId: req.params.id })
    .sort({ createdAt: -1 })
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
module.exports = router;
