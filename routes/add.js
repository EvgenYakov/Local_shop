const {Router} = require("express");
const Course = require('../models/course');
const router = Router();
const auth = require('../middleware/auth');

router.get('/',auth,(req,res)=>{
    res.render('add',{
        title:'Добавление курса ',
        isAdd: true
    });
})

router.post('/',async (req,res)=>{
   // const course = new Course(req.body.title, req.body.price, req.body.img);
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    })

    try {
        await course.save();
        res.redirect('/courses')
    }catch (e) {
        console.log(e);
    }

})

module.exports = router