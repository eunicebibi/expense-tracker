const express = require('express')
const router = express.Router()
const Detail = require('../../models/detail')
const Category = require('../../models/category')
const { editValidation, newValidation } = require('../../tools/validation')

//新增頁面
router.get('/new', async(req, res) => {
  const categories = await Category.find().lean()
  res.render('new', { categories })
})

//儲存新增
router.post('/', async (req, res) => {
  // console.log(req.body)
try{
  const userId = req.user._id
  const { name, date, categoryId, amount } =req.body
  const categories = await Category.find().lean()

  if (name.length > 50){
    return newValidation (res, categories, name, date, categoryId, amount)
  }

  return Detail.create({ 
    name,
    date, 
    amount,
    userId,
    categoryId,
  })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
} catch (err) {
  console.log(err)
}
})

//修改
router.get('/:id/edit', async(req, res) => {
try{
  const userId = req.user._id
  const _id = req.params.id
  const categories = await Category.find().lean()
  const detail = await Detail.findOne({_id, userId}).lean()
  const category = await Category.findOne({_id: detail.categoryId}).lean()
  detail.categoryName = category.name
  detail.date = detail.date.toISOString().slice(0, 10)
  res.render('edit', {detail, categories})
} catch (err){
  console.log(err)
}
})

router.put('/:id', async(req, res) => {
try{
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body

  if (name.length > 50) {
    return editValidation(res, _id, name, date, categoryId, amount)
  }

  return Detail.findOneAndUpdate(
    { _id},
    { name,
    date,
    amount,
    userId,
    categoryId
   })
  
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  } catch (err){
    console.log(err)
  }
})

router.delete('/:id', (req, res) => {
  try{
  const userId = req.user._id
  const _id = req.params.id
  return Detail.findOne({ _id, userId })
    .then(detail => detail.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  } catch (err) {
    console.log(err)
  }
})


module.exports = router