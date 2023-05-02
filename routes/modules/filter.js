const express = require('express')
const router = express.Router()
const Detail = require('../../models/detail')
const Category = require('../../models/category')
const calculator = require('../../tools/calculator')

router.post('/', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryId = req.body.filter  
    if (categoryId === 'all') {
      res.redirect('/')
    } else {
      const details = await Detail.find({ categoryId, userId }).lean()
      const categories = await Category.find().lean()
      const category = await Category.findOne({ _id: categoryId }).lean()
      const mapDetails = details.map((detail) => {
        return {
          ...detail,
          date: detail.date.toLocaleDateString(),
          icon: category.icon
        }
      })
      const totalAmount = calculator(mapDetails)

      res.render('index', { mapDetails, totalAmount, categories, category })
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router