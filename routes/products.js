const express = require('express')
const router = express.Router()
const UserProducts = require('../models/UserProducts')

router.get('/', async (req, res) => {
        const result = await UserProducts.find({})
        res.send(result)


})
router.post('/', async (req, res) => {
        const { title, description, price, category} = req.body
        const user = await UserProducts.create({ title, description, price, category})
        res.send(user)
})
router.put('/:id', async(req, res) => {
        const {id} = req.params
        const update = req.body
        const result = await UserProducts.findByIdAndUpdate(id, update,{new : true})
        res.send(result)
})
router.delete('/:id',async(req,res)=>{
        const {id} = req.params
        const result = await UserProducts.findByIdAndDelete(id)
    res.send(result)
    })
module.exports = router