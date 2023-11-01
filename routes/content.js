const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/contentController'),
    multerLib = require('multer')();

router.post('/upload', multerLib.single('image'), controller.upload)
router.get('/getAllContent',controller.getAllContent)
router.get('/getContent/:id',controller.getContentById)
router.delete('/deleteContent/:id',controller.deleteContent)
router.put('/editContent/:id',multerLib.single('image'),controller.editContent)
    

module.exports = router