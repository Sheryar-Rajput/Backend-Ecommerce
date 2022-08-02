const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Products = require('./UserProducts');
const Orders = new Schema(
  {
    products: {
      type : [{
       productId: {
          type : mongoose.Types.ObjectId,
          ref : 'products',
          validate: {
            validator: async (v) => {
              const _pro = await Products.findOne({_id : v});
              if(_pro){
                return true;
              }
              return false;
            },
            message: props => `No such record exists!`
          },
        },
        quantity: {
          type:Number,
          default : 1
        }
      }]
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