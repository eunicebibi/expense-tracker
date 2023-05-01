const mongoose = require('mongoose')
const Detail = require('../detail') 
const Category = require('../category')
const db = require('../../config/mongoose')
const recordsData = require('../../records').results

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  const categories = Category.find().lean()
  const categoryIds = {}
  categories.map(category => {
    categoryIds[category.name] = category._id
  })
  const userId = user._id
})