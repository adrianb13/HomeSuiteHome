const router = require("express").Router();
const apiController = require("../../controllers/propertyController");

router
  .route("/")
  .get(apiController.findAllUsers)
  .post(apiController.createUser);

router
  .route("/:id")
  .put(apiController.updateUser)
  .delete(apiController.removeUser);

router
  .route("/:email")
  .get(apiController.findByUserId);

router
  .route("/id/:id")
  .get(apiController.findById)

  module.exports = router;
