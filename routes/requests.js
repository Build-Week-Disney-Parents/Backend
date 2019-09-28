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
    .catch(error => next({ message: "Unable to list requests" }));
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
      isEmpty: false
      // isIn: { options: ["childcare", "stroller"] }
    },
    location: {
      in: ["body"],
      isEmpty: false
    }
  }),
  checkValidation,
  (req, res, next) => {
    Request.create({ user_id: req.token.subject, ...req.body })
      .then(request => res.status(201).send())
      .catch(error => next({ message: "Unable to create new request", error }));
  }
);

router.get(
  "/:id",
  authenticate,
  checkSchema(requestDetailSchema),
  checkValidation,
  (req, res, next) => {
    Request.getByID(req.params.id)
      .then(request => {
        if (request) {
          res.json({ request });
        } else {
          next({
            status: 404,
            message: "Request cannot be found with that ID"
          });
        }
      })
      .catch(error => next({ message: "Unable to list request", error }));
  }
);

router.get(
  "/:id/comments",
  authenticate,
  checkSchema(requestDetailSchema),
  checkValidation,
  (req, res, next) => {
    getRequestComments(req.params.id)
      .then(comments => res.json({ comments }))
      .catch(error => next({ message: "Unable to list comments", error }));
  }
);

module.exports = router;
