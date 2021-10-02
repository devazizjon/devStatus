const {
    Router
} = require('express');
const router = Router()
const Car= require('../models/cars')


router.get('/', (req, res) => {
    res.render('add', {
        title: 'Books add',
        isAdd: true
    })
})
router.post('/',async(req,res)=>{

  const cars = new Car(req.body.model,req.body.price,req.body.img)
 await cars.save()
    res.redirect('/cars')
})



module.exports = router







