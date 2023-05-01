const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const details = require('../routes/modules/details')
const users = require('./modules/users')  

router.use('/', home)
router.use('/details', details)
router.use('/users', users) 


module.exports = router