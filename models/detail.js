const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Detail', detailSchema)