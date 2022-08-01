const express = require('express')
const router = express.Router()
const UserOrder = require('../models/UserOrders')

router.get('/', async (req, res) => {
    const result = await UserOrder.find({})
    res.send(result)
})
router.post('/', async (req, res) => {
    const { productId, quantity, userId,status } = req.body
    const user = await UserOrder.create({ productId, quantity, userId,status })
    res.send(user)
})
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const update = req.body
    const result = await UserOrder.findByIdAndUpdate(id, update)
    res.send(result)
})
router.delete('/:id',async(req,res)=>{
    const {id} = req.params
    const result = await UserOrder.findByIdAndDelete(id)

})
router.get('/pending',async(req,res)=>{
    const result = await UserOrder.find({"status" : 'PENDING'})
res.send(result)
})

module.exports = router