const Category = require('../models/category')

module.exports = {
  editPageValidationUtil: async (res, _id, name, date, categoryId, amount) => {
      const categories = await Category.find().lean()
      const category = await Category.findOne({ _id: categoryId }).lean()
      const detail= { _id, name, date, categoryId, amount }
      expense.categoryName = category.name
      return res.render('edit', {
        _id,
        name,
        date,
        detail,
        categories
      })
    }
  }
 
