const express = require('express'),
    router = express.Router(),
    authRouter = require('./auth'),
    userRouter = require('./user'),
    contentRouter = require('./content');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/content', contentRouter);



module.exports = router
