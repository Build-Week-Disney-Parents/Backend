const router = require("express").Router();
const { checkSchema } = require("express-validator");

const checkValidation = require("../middleware/validation.js");
const authenticate = require("../middleware/authenticate.js");

const Request = require("../models/Request.js");

router.get("/", authenticate, (req, res) => {
  Request.all()
    .then(requests => res.json(requests))
    .catch(error => next("Unable to list requests"));
});

router.post("/", authenticate, (req, res) => {});

router.get(
  "/:id",
  [
    checkSchema({
      id: {
        in: ["params"],
        isInt: true,
        errorMessage: "ID must be an integer"
      }
    }),
    checkValidation,
    authenticate
  ],
  (req, res) => {
    res.send("Hello world!");
  }
);

module.exports = router;
