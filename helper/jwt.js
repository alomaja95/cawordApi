const expressJwt = require("express-jwt");
const authJwt = () => {
  const api = process.env.API;
  return expressJwt({
    secret: process.env.secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/books\/images(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/books\/pdfs(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/books\/audios(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/books\/avater(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/category(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/publish\/shop\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/publish\/get\/count\/shop\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/publish\/books\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/publish\/related\/book\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/order\/user\/order\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/order\/user\/book\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/order\/get\/count\/order\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/order\/get\/count\/order\/book\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/user\/profile\/user\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/user\/profile\/update\/.*/,
        methods: ["PUT", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/user\/profile\/update\/password\/.*/,
        methods: ["PUT", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/order\/order\/delete\/.*/,
        methods: ["DELETE", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/reviews\/get\/count\/one\/rating\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/reviews\/get\/count\/two\/rating\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/reviews\/get\/count\/three\/rating\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/reviews\/get\/count\/four\/rating\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/reviews\/get\/count\/five\/rating\/.*/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/reviews\/comment\/.*/,
        methods: ["GET", "OPTIONS"],
      },

      `${api}/users/admin/register`,
      `${api}/users/admin/login`,
      `${api}/users/publisher/register`,
      `${api}/users/publisher/login`,
      `${api}/publish/all/books`,
      `${api}/publish/shop`,
      `${api}/publish/best/seller/books`,
      `${api}/user/`,
      `${api}/user/login`,
      `${api}/reviews/`,
      `${api}/order/`,
    ],
  });
};
const isRevoked = async (req, payload, done) => {
  if (payload.admin || payload.publisher) {
    done();
  } else {
    done(null, true);
  }
};
module.exports = authJwt;
