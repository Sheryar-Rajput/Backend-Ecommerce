const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Orders = new Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId , 
      required: true
    },
    quantity: {
      type: Number,
      default : 1
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    status : {
      type  : String,
      enum : ['PENDING','DELIVERED'],
      default  : "PENDING"   
    }
  }
)
const UserOrders = mongoose.model('orders', Orders)
module.exports = UserOrders