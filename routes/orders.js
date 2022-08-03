const express = require('express')
const router = express.Router()
const UserOrder = require('../models/UserOrders')
const Products = require('../models/UserProducts');
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
               
                status:1,
                totalPrice :1
                
                
    
            
            }
        } ,
        {$lookup:  {
        from: 'products', localField: 'products.productId', foreignField: '_id', as: 'productInfo'
        ,pipeline:[{$project: {_id : 0,description : 0,category : 0, __v : 0 }}]
    }


    },
 
    
    {
        $unwind: {path:"$productInfo", preserveNullAndEmptyArrays: true},
       
    }
    ,
        { $group: {
        
          _id: "$_id",
         "status": { "$first": "$status" } ,
         "products":{"$first" : "$products"},
         "products": {"$push" : "$productInfo"},
         "userId" : {"$first" : "$userId"},
         "totalPrice":{"$first" : "$totalPrice"}
         
        } },
  {
        $lookup : {
            from: 'auths', localField: 'userId', foreignField: '_id', as: 'user'
            ,pipeline:[{$project: {_id : 0,password : 0, __v : 0 }}]
        }
    },
    { $unset: [ "userId","_id" ] }
  
   
    
]

    const data = await UserOrder.aggregate(aggregation);
    res.send(data);



})
async function sumProducts(products){
    const ids = products.map((v)=>{return v.productId});
    const _products = await Products.find({_id : {$in : ids}})
    let sum = 0;
    for(let i = 0 ; i < products.length ; i++){
      sum += (products[i].quantity * _products[i].price)
    }
    console.log(sum);
    return  sum;
}
router.post('/', async (req, res) => {
    const { products,userId,status } = req.body
    const _sum = await  sumProducts(products);
    const _user = await UserOrder({products: products ,userId: userId , status:status ,totalPrice: _sum});
    
    const user = await _user.save();
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