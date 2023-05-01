const express = require('express')
const router = express.Router()
const Detail = require('../../models/detail')
const Category = require('../../models/category')
const calculator = require('../../tools/calculator')

router.get('/', async (req, res) => {
  try{
  const userId = req.user._id   
  const details = await Detail.find({ userId}).lean()
  const categories = await Category.find().lean()
  const mapDetails = await Promise.all (details.map(async (detail) => {
    const categoryId = detail.categoryId
    const category = await Category.findOne({_id: categoryId}).lean()
    return {
      ...detail,
      date: detail.date.toLocaleDateString(),
      icon: category.icon
    }
  }))

  const totalAmount = calculator(mapDetails)
    res.render('index', { mapDetails, totalAmount, categories })
}catch (err) { 
  console.log(err)
  }
})



module.exports = router