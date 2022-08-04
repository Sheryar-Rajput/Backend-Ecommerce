const UserProducts = require('../models/UserProducts')

const getProduct = async () => {
    return await UserProducts.find({})
}
const addproduct = async (data) => {
    const { title, description, price, category } = data
    return await UserProducts.create({ title, description, price, category })
}
const updateProduct = async (id, update) => {
    return await UserProducts.findByIdAndUpdate(id, update, { new: true })

}
const deleteProduct = async(id)=>{
return await UserProducts.findByIdAndDelete(id)
}

module.exports.getProduct = getProduct
module.exports.addproduct = addproduct
module.exports.updateProduct = updateProduct
module.exports.deleteProduct = deleteProduct