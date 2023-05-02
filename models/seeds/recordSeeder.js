const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Detail = require('../detail') 
const Category = require('../category')
const db = require('../../config/mongoose')
const User = require('../user')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async() => {
  console.log('mongodb connected!')
  const categories = await Category.find().lean()
  const categoryIds = {}
  categories.map(category => {
    categoryIds[category.name] = category._id
  })
  //種子資料
  const SEED_USER = {
    name: 'user',
    email: 'user@example.com',
    password: '12345678'
  }
  const SEED_DETAILS = [{
    name: '早餐',
    date: Date.now(),
    amount: 30,
    categoryId: categoryIds['餐飲食品']
  }, {
    name: '交通費',
    date: Date.now(),
    amount: 100,
    categoryId: categoryIds['交通出行']
  }, {
    name: '出遊費用',
    date: Date.now(),
    amount: 2000,
    categoryId: categoryIds['休閒娛樂']
  }, {
    name: '買電腦',
    date: Date.now(),
    amount: 32000,
    categoryId: categoryIds['家居物業']
  }]

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(SEED_USER.password, salt)
  // load user seed into db
  const user = await User.create({
    name: SEED_USER.name,
    email: SEED_USER.email,
    password: hash
  })
  const userId = user._id
  const detailPromises = SEED_DETAILS.map(async (detail) => {
    await Detail.create({ ...detail, userId })
  })
  await Promise.all(detailPromises)
  console.log('user and detail seeder set done')
  process.exit()
})