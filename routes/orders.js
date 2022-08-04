const express = require('express')
const router = express.Router()
const UserOrder = require('../models/UserOrders')
const { getOrder, addOrder, updateOrder, deleteOrder,getOrderDetails } = require('../controller/orderController')

router.get('/', async (req, res) => {
    const result = await getOrder()
    res.send(result)
})
router.post('/', async (req, res) => {
    const data = req.body
    const result = await addOrder(data)
    res.send(result)
})
router.post('/all', async (req, res) => {
    const {status} = req.body
    const result = await getOrderDetails(status)
    res.send(result);
})
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const update = req.body
    const result = await updateOrder(id, update)
    res.send(result)
})
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await deleteOrder(id)
    res.send(result)
})


module.exports = router