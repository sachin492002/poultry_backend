const router = require("express").Router();

const userController = require("../controller/userController");

// GET Routes
router.get("/user/:id", userController.getUserById);

// POST Routes
router.post("/user",userController.postUser);
router.post("/userUpdate",userController.postUpdateUser);
router.post("/users",  userController.postRegister);
  

module.exports = router;

