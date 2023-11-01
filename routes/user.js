const express = require('express'),
    router = express.Router(),
    controller = require("../controllers/userController")


router.get("/getAllUser",controller.getUser)
    



module.exports = router