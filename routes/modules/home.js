const express = require('express')
const router = express.Router()
const Detail = require('../../models/detail')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id   
  Detail.find().lean()
    .sort({ _id: 'asc' })
    .then(details => {
      //transform date format to YYYY/MM/DD
      return details.map((detail) => {
        if (detaile) {
          let formattedDate = detail.date.toLocaleDateString()
          detail.date = formattedDate
          return detail
        }
      })
    })
    .then((details) => {
      res.render('index', { details })
    })
    .catch(err => console.log(err))
})



module.exports = router