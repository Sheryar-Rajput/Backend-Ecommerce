const UserOrder = require('../models/UserOrders')
const Products = require('../models/UserProducts');

const getOrder = async () => {
    return await UserOrder.find({})
}

const addOrder = async (data) => {
    const { products, userId, status } = data
    const _sum = await sumProducts(products)
    return await UserOrder.create({ products: products, userId: userId, status: status, totalPrice: _sum });
}
// for calculating total price * quantity
const sumProducts = async (products) => {
    const ids = products.map((v) => { return v.productId });
    // console.log("ids",ids);
    const _products = await Products.find({ _id: { $in: ids } })
    
    let sum = 0;
    for (let i = 0; i < _products.length; i++) {
        sum += (products[i].quantity * _products[i].price)
    }
    console.log(sum);
    return sum;
}
const updateOrder = async (id, update) => {
    return await UserOrder.findByIdAndUpdate(id, update)
}
const deleteOrder = async (id) => {
    return await UserOrder.findByIdAndDelete(id)
}

const getOrderDetails=async(productStatus)=>{
    const aggregation = [
        {
            $match: {
                status: productStatus
            }
        },
        {
            $project: {
                _id: 1,
                products: 1,
                userId: 1,
                status: 1,
                totalPrice: 1,
                quantity: 1,
            }
        },
        {
            $lookup: {
                from: 'products', localField: 'products.productId', foreignField: '_id', as: 'productInfo'
                , pipeline: [{ $project: { _id: 0, description: 0, category: 0, __v: 0 } }]
            }
        },
        {
            $group: {
                _id: "$_id",
                "status": { "$first": "$status" },
                "products": { "$first": "$products" },
                "products": { "$push": { "productInfo": "$productInfo", "quantity": "$products.quantity" } },
                "userId": { "$first": "$userId" },
                "totalPrice": { "$first": "$totalPrice" },
            }
        },
        {
            $lookup: {
                from: 'auths', localField: 'userId', foreignField: '_id', as: 'user'
                , pipeline: [{ $project: { _id: 0, password: 0, __v: 0 } }]
            }
        },
        { $unset: ["userId"] }
    ]
return await UserOrder.aggregate(aggregation);
}


module.exports.getOrder = getOrder
module.exports.addOrder = addOrder
module.exports.updateOrder = updateOrder
module.exports.deleteOrder = deleteOrder
module.exports.getOrderDetails  = getOrderDetails