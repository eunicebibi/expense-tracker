const mongoose = require('mongoose')
const Detail = require('../detail') 
const Category = require('../category')
const recordsData = require('../../records').results
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('strictQuery', false)

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