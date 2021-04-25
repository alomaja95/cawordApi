const { Admin } = require("../model/registerModel");
const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Publisher } = require("../model/publisherRegisterModel");
const multer = require("multer");
router.post("/admin/register", (req, res) => {
  const admin = new Admin({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    passwordHash: bycrypt.hashSync(req.body.password, 10),
  });
  admin
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});
router.post("/publisher/register", (req, res) => {
  const publisher = new Publisher({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    passwordHash: bycrypt.hashSync(req.body.password, 10),
  });
  publisher
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});
router.post("/admin/login/", (req, res) => {
  Admin.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user && bycrypt.compareSync(req.body.password, user.passwordHash)) {
          const secret = process.env.secret;
          const token = jwt.sign({ userId: user._id, admin: true }, secret, {
            expiresIn: "1w",
          });
          res.status(201).json({
            message: "user authenticated",
            token,
            success: true,
          });
        } else {
          res.status(404).json({
            message: "invalid Authentication",
            success: false,
          });
        }
      } else {
        res.status(404).json({
          message: "invalid Authentication",
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
router.post("/publisher/login/", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  Publisher.findOne({ email: req.body.email })

    .then((user) => {
      console.log(user);
      if (user) {
        if (user && bycrypt.compareSync(req.body.password, user.passwordHash)) {
          const secret = process.env.secret;
          const token = jwt.sign(
            { userId: user._id, publisher: true },
            secret,
            {
              expiresIn: "1w",
            }
          );

          res.status(201).json({
            message: user,
            token,
            success: true,
          });
        } else {
          res.status(404).json({
            message: "invalid Authentication",
            success: false,
          });
        }
      } else {
        res.status(404).json({
          message: "invalid Authentication",
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
router.get("/publisher/profile/:id", (req, res) => {
  Publisher.findById(req.params.id)
    .select("-passwordHash")
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "record not found",
          success: false,
        });
      }
    })
    .catch((error) => [
      res.status(500).json({
        message: error.message,
        success: false,
      }),
    ]);
});
router.put("/publisher/profile/:id", (req, res) => {
  Publisher.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      companyName: req.body.companyName,
      location: req.body.location,
    },
    { new: true }
  )

    .select("-passwordHash")
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: result,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "record not found",
          success: false,
        });
      }
    })
    .catch((error) => [
      res.status(500).json({
        message: error.message,
        success: false,
      }),
    ]);
});

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "books/avater");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });
router.put(
  "/publisher/upload/avater/:id",
  uploadOptions.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(404).json({
        message: "file not uploaded",
        success: false,
      });
    }
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/books/avater/`;
    Publisher.findByIdAndUpdate(
      req.params.id,
      {
        avaterUrl: `${basePath}${fileName}`,
      },
      { new: true }
    )
      .select("-passwordHash")
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
);
module.exports = router;
