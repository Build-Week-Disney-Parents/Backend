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

router.delete("/:id", authenticate, (req, res, next) => {
  Comment.getByID(req.params.id).then(comment => {
    if (comment) {
      if (comment.user_id === req.token.subject) {
        Comment.destroy(req.params.id).then(comment => res.status(204).send());
      } else {
        next({
          status: 403,
          message: "You are not authorized to delete that comment."
        });
      }
    } else {
      next({ status: 404, message: "Comment does not exist" });
    }
  });
});

module.exports = router;
