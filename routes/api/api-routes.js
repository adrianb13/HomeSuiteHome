const router = require("express").Router();
const apiController = require("../../controllers/propertyController")

// /api/users (user list)
// /api/users/:id (user details)
// /api/properties (property list)
// /api/properties/:id (property details)
// /api/leases (lease list)
// /api/leases/:id (lease details)
// /api/workorders/ (work order list)
// /api/workorders/:id (work order details)


router
  .route("/api/users")
  .get(apiController.findAllUsers)
  .post(apiController.createUser);

router
  .route("/api/users/:id")
  .get(apiController.findByUserId)
  .put(apiController.updateUser)
  .delete(apiController.removeUser);

router
  .route("/api/properties")
  .get(apiController.findAllProperties)
  .post(apiController.createProperty);

router
  .route("/api/properties/:id")
  .get(apiController.findByPropertyId)
  .put(apiController.updateProperty)
  .delete(apiController.removeProperty)

router
  .route("/api/leases")
  .get(apiController.findAllLeases)
  .post(apiController.createLease);

router
  .route("/api/leases/:id")
  .get(apiController.findByLeaseId)
  .put(apiController.updateLease)
  .delete(apiController.removeLease)

router
  .route("/api/workorders")
  .get(apiController.findAllOrders)
  .post(apiController.createOrder);

router
  .route("/api/workorders/:id")
  .get(apiController.findByOrderId)
  .put(apiController.updateOrder)
  .delete(apiController.removeOrder)

module.exports = router;