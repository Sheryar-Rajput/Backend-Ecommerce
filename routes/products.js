const express = require('express')
const router = express.Router()
const authorization = require('../config/verify')
const { getProduct,
        addproduct,
        updateProduct,
        deleteProduct } = require('../controller/productController')

router.get('/', async (req, res) => {
        const result = await getProduct()
        res.send(result)
})
router.post('/',authorization, async (req, res) => {
        const data = req.body
        const result = await addproduct(data)
        res.send(result)
})
router.put('/:id', async (req, res) => {
        const { id } = req.params
        const update = req.body
        const result = await updateProduct(id, update)
        res.send(result)
})
router.delete('/:id', async (req, res) => {
        const { id } = req.params
        const result = await deleteProduct(id)
        res.send(result)
})
module.exports = router