const router = require("express").Router();
const { checkSchema } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User.js");
const checkValidation = require("../middleware/validation.js");
const createToken = require("../middleware/token.js");

const userSchema = {
  username: {
    in: ["body"],
    isEmpty: false,
    errorMessage: "Username must be provided"
  },
  password: {
    in: ["body"],
    isEmpty: false,
    isLength: {
      options: { min: 4 },
      errorMessage: "Password must be at least 4 characters long"
    }
  }
};

const registrationSchema = {
  ...userSchema,
  full_name: {
    in: ["body"],
    isEmpty: false,
    errorMessage: "Full name must be provided"
  }
};

router.post(
  "/register",
  checkSchema(registrationSchema),
  checkValidation,
  (req, res, next) => {
    User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 12),
      full_name: req.body.full_name
    })
      .then(user => {
        res.json({ token: createToken(user) });
      })
      .catch("Unable to create user", error);
  }
);

router.post(
  "/login",
  checkSchema(userSchema),
  checkValidation,
  (req, res, next) => {
    User.getByName(req.body.username)
      .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          res.json({ token: createToken(user) });
        } else {
          next({ status: 401, message: "Invalid credentials" });
        }
      })
      .catch(error => next("Unable to authenticate user", error));
  }
);

module.exports = router;
