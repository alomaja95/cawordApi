const express = require("express");
const { Category } = require("../model/categoryModel");
const { PublishBook } = require("../model/publishbooksSchema");
const multer = require("multer");
const mm = require("music-metadata");

const router = express.Router();
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
    cb(uploadError, "books/images");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.post("/", (req, res) => {
  Category.findById(req.body.category)
    .then((categoryId) => {
      if (categoryId) {
        const uploadBooks = new PublishBook({
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          language: req.body.language,
          price: req.body.price,
          description: req.body.description,
          userId: req.user.userId,
          image: req.body.image,
          isFeatured: req.body.isFeatured,
          bestSeller: req.body.bestSeller,
          newArrival: req.body.newArrival,
          richAudio: req.body.richAudio,
          audio: req.body.audio,
          bookFile: req.body.bookFile,
        });
        uploadBooks
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
      } else {
        res.status(404).json({
          message: "invalid request",
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
router.put("/image/:id", uploadOptions.single("file"), (req, res) => {
  PublishBook.findById(req.params.id)
    .then((result) => {
      if (result) {
        if (!req.file) {
          return res.status(404).json({
            message: "not image found",
            success: false,
          });
        }
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/books/images/`;
        PublishBook.findByIdAndUpdate(
          req.params.id,
          {
            image: `${basePath}${fileName}`,
          },
          { new: true }
        )
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
      } else {
        res.status(404).json({
          message: "record not found",
          status: false,
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
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    // const isValid = FILE_TYPE_Audio[file.mimetype];
    // let uploadError = new Error("invalid file type");
    // if (isValid) {
    //   uploadError = null;
    // }

    cb(null, "books/audios");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    // const extension = FILE_TYPE_Audio[file.mimetype];
    cb(null, `${fileName}`);
  },
});

const uploadOptions1 = multer({ storage: storage1 });
router.put("/:id", uploadOptions1.single("file"), (req, res) => {
  PublishBook.findById(req.params.id)
    .then((result) => {
      if (result) {
        if (!req.file) {
          return res.status(404).json({
            message: "file not uploaded",
            success: false,
          });
        }
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/books/audios/`;
        PublishBook.findByIdAndUpdate(
          req.params.id,
          {
            audio: `${basePath}${fileName}`,
          },
          { new: true }
        )
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
      } else {
        res.status(404).json({
          message: "record not found",
          status: false,
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
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    // const isValid = FILE_TYPE_Audio[file.mimetype];
    // let uploadError = new Error("invalid file type");
    // if (isValid) {
    //   uploadError = null;
    // }

    cb(null, "books/audios");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    // const extension = FILE_TYPE_Audio[file.mimetype];
    cb(null, `${fileName}`);
  },
});

const uploadOptions2 = multer({ storage: storage2 });
router.put("/rich/audio/:id", uploadOptions2.single("file"), (req, res) => {
  PublishBook.findById(req.params.id)
    .then((result) => {
      if (result) {
        if (!req.file) {
          return res.status(404).json({
            message: "file not uploaded",
            success: false,
          });
        }
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/books/audios/`;
        PublishBook.findByIdAndUpdate(
          req.params.id,
          {
            richAudio: `${basePath}${fileName}`,
          },
          { new: true }
        )
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
      } else {
        res.status(404).json({
          message: "record not found",
          status: false,
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
const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    // const isValid = FILE_TYPE_Audio[file.mimetype];
    // let uploadError = new Error("invalid file type");
    // if (isValid) {
    //   uploadError = null;
    // }

    cb(null, "books/pdfs");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    // const extension = FILE_TYPE_Audio[file.mimetype];
    cb(null, `${fileName}`);
  },
});

const uploadOptions3 = multer({ storage: storage3 });
router.put("/pdf/:id", uploadOptions3.single("file"), (req, res) => {
  PublishBook.findById(req.params.id)
    .then((result) => {
      if (result) {
        if (!req.file) {
          return res.status(404).json({
            message: "file not uploaded",
            success: false,
          });
        }
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/books/pdfs/`;
        PublishBook.findByIdAndUpdate(
          req.params.id,
          {
            bookFile: `${basePath}${fileName}`,
          },
          { new: true }
        )
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
      } else {
        res.status(404).json({
          message: "record not found",
          status: false,
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
  PublishBook.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: "book deleted successful",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "record not found",
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
router.get("/publisher/books/:id", (req, res) => {
  const { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 5;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  PublishBook.find({ userId: req.params.id })
    .sort({ createdAt: -1 })
    .populate("category")
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
router.get("/get/count/publisher/:id", async (req, res) => {
  const count1 = await PublishBook.find({
    userId: req.params.id,
  }).countDocuments((count) => count);
  if (!count1) {
    res.status(500).json({
      message: "no record found",
      success: false,
    });
  } else {
    res.status(201).json({
      message: count1,
      success: true,
    });
  }
});
router.get("/book/publisher/:productId", (req, res) => {
  PublishBook.findById(req.params.productId)
    .populate("category")
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
    .catch((error) => {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    });
});
router.put("/book/publisher/update/:productId", (req, res) => {
  PublishBook.findByIdAndUpdate(
    req.params.productId,
    {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      language: req.body.language,
      price: req.body.price,
      description: req.body.description,
      userId: req.user.userId,
      image: req.body.image,

      richAudio: req.body.richAudio,
      audio: req.body.audio,
      bookFile: req.body.bookFile,
    },
    { new: true }
  )
    .then((result) => {
      if (result) {
        res.status(201).send({
          message: result,
          success: true,
        });
      } else {
        res.status(500).send({
          message: "not found",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
        success: false,
      });
    });
});
router.get("/all/books", (req, res) => {
  const startFrom = Math.floor(Math.random() * 6);
  PublishBook.find()
    .skip(startFrom)
    .limit(12)
    .populate("category")

    .then((result) => {
      if (result) {
        res.status(201).json({
          success: true,
          message: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});
router.get("/shop", (req, res) => {
  const { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  PublishBook.find({ category: req.query.category })
    .sort({ createdAt: -1 })
    .populate("category")
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
router.get("/get/count/shop/:id", async (req, res) => {
  const count1 = await PublishBook.find({
    category: req.params.id,
  }).countDocuments((count) => count);
  if (!count1) {
    res.status(500).json({
      message: "no record found",
      success: false,
    });
  } else {
    res.status(201).json({
      message: count1,
      success: true,
    });
  }
});
router.get("/best/seller/books", (req, res) => {
  const startFromNumber = Math.floor(Math.random() * 2);
  PublishBook.find({ bestSeller: true })
    .skip(startFromNumber)
    .limit(6)
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
router.get("/books/:productId", (req, res) => {
  PublishBook.findById(req.params.productId)
    .then((result) => {
      if (result) {
        res.status(201).json({
          success: true,
          message: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});
router.get("/related/book/:categoryId", (req, res) => {
  PublishBook.findById(req.params.categoryId)
    .then((result) => {
      if (result) {
        PublishBook.find({ category: result.category })
          .limit(6)
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
