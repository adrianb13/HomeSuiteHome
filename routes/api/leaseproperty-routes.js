const router = require("express").Router();
const apiController = require("../../controllers/propertyController");

router
  .route("/")
  .post(apiController.associateLeaseToProperty);

module.exports = router;