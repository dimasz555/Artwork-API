const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/authController"),
  validate = require("../middlewares/validate"),
  schema = require("../validatorSchemas/authValidatorSchema"),
  checkToken = require("../middlewares/checkToken");

router.post('/register', validate(schema.registerValidator),controller.register);
router.post('/login', validate(schema.loginValidator), controller.login);
router.get('/getProfile', checkToken, controller.getProfile)


module.exports = router
