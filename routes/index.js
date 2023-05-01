const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const details = require('../routes/modules/details')

router.use('/', home)
router.use('/details', details)



module.exports = router