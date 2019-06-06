const router = require("express").Router();
const apiController = require("../../controllers/propertyController");

router
  .route("/")
  .post(apiController.associateTenantToProperty)
  .delete(apiController.associateDeleteTenant);

module.exports = router;