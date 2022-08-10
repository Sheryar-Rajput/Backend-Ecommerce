const express = require('express')
const router = express.Router()
const authorization = require('../config/verify')
const { use } = require('../utils/caughterror')
const { getProduct,
        addproduct,
        updateProduct,
        deleteProduct } = require('../controller/productController')

router.get('/', use(async (req, res) => {
        const result = await getProduct()
                .catch(err => {
                        throw new Error(err)
                })
        res.json(result)
}))
router.post('/', authorization, use(async (req, res) => {
        const data = req.body
        const result = await addproduct(data)
                .catch(err => {
                        throw new Error(err)
                })
        res.json(result)
}))
router.put('/:id', use(async (req, res) => {
        const { id } = req.params
        const update = req.body
        const result = await updateProduct(id, update)
                .catch(err => {
                        throw new Error(err)
                })
        res.json(result)
}))
router.delete('/:id', use(async (req, res) => {
        const { id } = req.params
        const result = await deleteProduct(id)
                .catch(err => {
                        throw new Error(err)
                })
        res.json(result)
}))
module.exports = router