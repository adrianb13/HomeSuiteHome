const router = require("express").Router();
const apiController = require("../../controllers/propertyController");

router
  .route("/")
  .get(apiController.findAllProperties)
  .post(apiController.createProperty);

router
  .route("/:id")
  .get(apiController.findByPropertyId)
  .put(apiController.updateProperty)
  .delete(apiController.removeProperty)

module.exports = router;
