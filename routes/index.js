const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const details = require('./modules/details')
const filter = require('./modules/filter')
const users = require('./modules/users')  
 
router.use('/users', users) 
router.use('/details', authenticator, details)
router.use('/filter', authenticator, filter)
router.use('/', authenticator, home)


module.exports = router