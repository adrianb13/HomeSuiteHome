const router = require("express").Router();
const apiController = require("../../controllers/propertyController");

router
  .route("/")
  .get(apiController.findAllOrders)
  .post(apiController.createOrder)
  .put(apiController.updateOrder);

router
  .route("/:id")
  .get(apiController.findByOrderId)
//  .put(apiController.updateOrder)
  .delete(apiController.removeOrder)

module.exports = router;
