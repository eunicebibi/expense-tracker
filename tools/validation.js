const Category = require('../models/category')

module.exports = {
  editValidation: async (res, _id, name, date, categoryId, amount) => {
    const errors=[]
    errors.push({message: '名稱不可超過200字'})
    if(errors.length) {
      const categories = await Category.find().lean()
      const category = await Category.findOne({ _id: categoryId }).lean()
      const detail= { _id, name, date, categoryId, amount }
      detail.categoryName = category.name
      return res.render('edit', {
        errors,
        detail,
        categories
      })
    }
  },
  newValidation: async (res, categories, name, date, categoryId, amount) => {
    const errors = []
    errors.push({ message: '名稱不可超過200字' })
    if (errors.length) {
      const category = await Category.findOne({ _id: categoryId }).lean()
      return res.render('new', {
        errors,
        name,
        date,
        categoryId: category._id,
        categoryName: category.name,
        amount,
        categories
      })
    }
  }
}

 
