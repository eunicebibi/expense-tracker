const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Detail = require('./models/detail')
const Category = require('./models/category')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port ='3000'
const app = express()
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('strictQuery', false)
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))

//首頁
app.get('/', (req, res) => {
  Detail.find().lean()
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

//新增頁面
app.get('/new', (req,res) => {
  const categories = Category.find().lean()
  return res.render('new', {categories})
})

//儲存新增
app.post('/', (req, res) => {
  // console.log(req.body)
  const detailsData = {
    categoryId: req.body.categoryId,
    // userId: req.user._id,
    name: req.body.name,
    date: req.body.date,
    amount: req.body.amount,
  };
  return Detail.create({...detailsData})
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})