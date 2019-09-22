const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const authenticate = require("../middleware/authenticate.js");
const Request = require("../models/Request.js");

router.get("/", authenticate, (req, res) => {
  Request.all()
    .then(requests => res.json(requests))
    .catch(error => next("Unable to list requests"));
});

router.post("/", authenticate, (req, res) => {});

router.get("/:id", authenticate, (req, res) => {});

module.exports = router;
