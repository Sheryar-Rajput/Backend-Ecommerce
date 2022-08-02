const express = require('express')
const router = express.Router()
const UserOrder = require('../models/UserOrders')

router.get('/', async (req, res) => {
    const result = await UserOrder.find({})
    res.send(result)
})

router.get('/all' , async (req,res)=>{
    const aggregation = [
        {
            $project : {
                _id:1,
                products : 1,
                userId : 1,
               
                
            
            }
        } ,
        {$lookup:  {
        from: 'products', localField: 'products.productId', foreignField: '_id', as: 'products'
    
    }


    },

    {
        $lookup : {
            from: 'auths', localField: 'userId', foreignField: '_id', as: 'user'
            ,pipeline:[{$project: {_id : 0,password : 0, __v : 0 }}]
        }
    },
    { $unset: [ "userId"  ] }
   
    
]

    const data = await UserOrder.aggregate(aggregation);
    res.send(data);



})
router.post('/', async (req, res) => {
    const { products,userId,status } = req.body
    const user = await UserOrder.create({ products,userId,status })
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