const {Router} = require("express");
const router = Router();
const Course = require('../models/course');
const User = require('../models/user')
const auth = require("../middleware/auth");

function sumPrice(courses){
    return courses.reduce((sum,obj) => {
        return sum += obj.price*obj.count;
    },0)
}

function mapCartItems(cart){
    return cart.items.map(c=>({
        ...c.courseId._doc,
        id: c.courseId.id,
        count: c.count
    }));
}

router.post('/add',async (req,res)=>{
    const course = await Course.findById(req.body.id);
    await req.user.addToCart(course)
    res.redirect('/card')
})

router.get('/',auth,async (req,res)=>{
    const user = await req.user.populate('cart.items.courseId');
    const courses = mapCartItems(user.cart)
    res.render('card',{
        title: "Корзина",
        isCard:true,
        courses,
        price:sumPrice(courses)
    })
})

router.delete('/remove/:id',async (req, res)=> {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.courseId')
    const courses = mapCartItems(user.cart)
    const cart = {
        courses, price: sumPrice(courses)
    }

    res.status(200).json(cart);
})

module.exports = router