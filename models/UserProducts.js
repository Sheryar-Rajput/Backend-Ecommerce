const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Products = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }
)
const UserProducts = mongoose.model('products', Products)
module.exports = UserProducts