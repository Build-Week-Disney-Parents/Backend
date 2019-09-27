const router = require("express").Router();
const { checkSchema } = require("express-validator");

const Comment = require("../models/Comment.js");
const authenticate = require("../middleware/authenticate.js");
const checkValidation = require("../middleware/validation.js");

router.post(
  "/",
  authenticate,
  checkSchema({
    request_id: {
      in: ["body"],
      isEmpty: false,
      isInt: true
    },
    body: {
      in: ["body"],
      isEmpty: false
    }
  }),
  checkValidation,
  (req, res) => {
    Comment.create({ user_id: req.token.subject, ...req.body }).then(comment =>
      res.status(201).send()
    );
  }
);

module.exports = router;
