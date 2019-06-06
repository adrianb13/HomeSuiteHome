const router = require("express").Router();
const apiController = require("../../controllers/propertyController");

router
  .route("/")
  .get(apiController.findAllLeases)
  .post(apiController.createLease)
  .put(apiController.updateLease);

router
  .route("/:id")
  .get(apiController.findByLeaseId)
//  .put(apiController.updateLease)
  .delete(apiController.removeLease)

module.exports = router;