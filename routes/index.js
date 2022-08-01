const express = require('express')
 const router = express.Router()

 router.use('/user',require('./user'))
 router.use('/product',require('./products'))
 router.use('/order',require('./orders'))

 module.exports = router
