const express = require('express')
const router = express.Router()
const UserOrder = require('../models/UserOrders')
const authorization = require('../config/verify')
const { use } = require('../utils/caughterror')

const { getOrder, addOrder, updateOrder, deleteOrder, getOrderDetails } = require('../controller/orderController')

router.get('/', use(async (req, res) => {
    const result = await getOrder()
        .catch(err => {
            throw new Error(err)
        })
    res.json(result)
}))
router.post('/', authorization, use(async (req, res) => {
    const data = req.body
    const result = await addOrder(data)
        .catch(err => {
            throw new Error(err)
        })
    res.json(result)
}))
router.post('/all', use(async (req, res) => {
    const { status } = req.body
    const result = await getOrderDetails(status)
        .catch(err => {
            throw new Error(err)
        })
    res.json(result);
}))
router.put('/:id', use(async (req, res) => {
    const { id } = req.params
    const update = req.body
    const result = await updateOrder(id, update)
        .catch(err => {
            throw new Error(err)
        })
    res.json(result)
}))
router.delete('/:id', use(async (req, res) => {
    const { id } = req.params
    const result = await deleteOrder(id)
        .catch(err => {
            throw new Error(err)
        })
    res.json(result)
}))


module.exports = router