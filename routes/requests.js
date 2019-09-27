const router = require("express").Router();
const { checkSchema } = require("express-validator");

const checkValidation = require("../middleware/validation.js");
const authenticate = require("../middleware/authenticate.js");

const { getRequestComments } = require("../models/Comment.js");
const Request = require("../models/Request.js");

const requestDetailSchema = {
  id: {
    in: ["params"],
    isInt: true,
    errorMessage: "ID must be an integer"
  }
};

router.get("/", authenticate, (req, res, next) => {
  Request.all()
    .then(requests => res.json(requests))
    .catch(error => next("Unable to list requests"));
});

router.post(
  "/",
  authenticate,
  checkSchema({
    title: { in: ["body"], isEmpty: false },
    description: { in: ["body"], optional: true },
    meeting_time: { in: ["body"], isEmpty: false },
    request_type: {
      in: ["body"],
      isEmpty: false,
      isIn: { options: ["stroller"], options: ["childcare"] }
    },
    location: {
      in: ["body"],
      isEmpty: false
    }
  }),
  checkValidation,
  (req, res, next) => {
    // Add user ID from token to body
    req.body.user_id = req.token.subject;

    Request.create(req.body)
      .then(request => res.json(request))
      .catch(error => next(error));
  }
);

router.get(
  "/:id",
  authenticate,
  checkSchema(requestDetailSchema),
  checkValidation,
  (req, res) => {
    Request.getByID(req.params.id).then(request => res.json(request));
  }
);

router.get(
  "/:id/comments",
  authenticate,
  checkSchema(requestDetailSchema),
  checkValidation,
  (req, res) => {
    getRequestComments(req.params.id).then(comments => res.json(comments));
  }
);

module.exports = router;
