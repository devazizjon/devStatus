const {Router}=require('express')
const router=Router()
const Card=require('../models/Card')
const Cars=require('../models/cars')

router.get("/",async(req,res)=>{
    const  card=await Card.fetch()
    res.render('card',{
        title:'Books Basket',
        isCard:true,
        cars:card.cars,
        price:card.price
    })
})
router.delete('/remove/:id',async(req,res)=>{
    console.log(req.params.id);
    const card=await Card.remove(req.params.id)
    res.status(200).json(card)
}) 

router.post('/add',async(req,res)=>{
    const car=await Cars.getById(req.body.id)
    console.log(car);
    
await Card.add(car)
res.redirect('/card') 


})
module.exports=router