const express = require('express')
const router = express.Router()
const Detail = require('../../models/detail')
const Category = require('../../models/category')


//新增頁面
router.get('/new', (req, res) => {
  const categories = Category.find().lean()
  return res.render('new', { categories })
})

//儲存新增
router.post('/', (req, res) => {
  // console.log(req.body)
  const userId = req.user._id
  const _id = req.params.id
  const detailsData = {
    categoryId: req.body.categoryId,
    userId: req.user._id,
    name: req.body.name,
    date: req.body.date,
    amount: req.body.amount,
  };
  return Detail.create({ ...detailsData })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

//修改
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Detail.findByOne({_id, userId})
    .lean()
    .then((detail) => res.render('edit', { detail }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  const detailsData = {
    name: req.body.name,
    date: req.body.date,
    categoryId: req.body.categoryId,
    amount: req.body.amount,
  };
  return Detail.findOne({ _id, userId })
    .then(detail => {
      detail.set(detailsData);
      return detail.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Detail.findOne({ _id, userId })
    .then(detail => detail.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router