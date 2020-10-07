const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const UserRouter = require('./routes/user.route');
const ContactRouter = require('./routes/contact.route');
const AuthRouter = require('./routes/auth.route');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require('cors');

dotenv.config();

const app = express();
app.set("port", process.env.APP_PORT);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: function fromHeader(req) {
      const tokenHeader =
        req.headers.Authorization || req.headers.authorization;
      if (tokenHeader && tokenHeader.split(" ")[0] === "Bearer") {
        return tokenHeader.split(" ")[1];
      }
    }
  }).unless({
    path: [{ url: "/auth/login", method: "POST" },{ url: "/users", method: "POST" }, { url: /^\/api-docs\/.*/, methods: ['GET', 'PUT'] }]
  })
  
);

app.use('/users', UserRouter);
app.use('/contacts', ContactRouter);
app.use('/auth', AuthRouter);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    if (err.inner.name === "TokenExpiredError") {
      decoded = jwt.verify(
        (req.headers.Authorization || req.headers.authorization).split(" ")[1],
        process.env.JWT_SECRET
      );
    }
    res.status(401).send({
      msg: "Invalid or no token supplied",
      code: 401
    });
  }
});

app.use((req, resp) => {
  resp.status(404).send({
    msg: "Not Found!"
  });
});

module.exports = app;
