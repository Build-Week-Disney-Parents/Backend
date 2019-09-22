const router = require("express").Router();
const { check, checkSchema, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User.js");
const checkValidation = require("../middleware/validation.js");
const createToken = require("../middleware/token.js");

router.post(
  "/register",
  [
    checkSchema({
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
    }),
    checkValidation
  ],
  (req, res) => {
    const newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 12)
    };

    User.create(newUser).then(user => res.status(201).send());
  }
);

router.post(
  "/login",
  [
    checkSchema({
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
    }),
    checkValidation
  ],
  (req, res, next) => {
    User.getByName(req.body.username)
      .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          token = createToken(user);
          res.json({ token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => next(error));
  }
);

module.exports = router;
