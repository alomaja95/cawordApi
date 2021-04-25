const errorHandling = (err, req, res, next) => {
  if (err) {
    res.status(err.status).json({
      message: err.message,
      success: false,
    });
  } else {
  }
};
module.exports = errorHandling;
