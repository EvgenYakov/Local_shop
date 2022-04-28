const {Router} = require("express");
const router = Router();
const Course = require('../models/course')

router.get('/',async (req,res)=>{
    const courses = await Course.find().lean().populate('userId','email name');
    res.render('corses',{
        title:'Курсы',
        isCourses:true,
        courses
    })
})

router.get('/:id/edit', async(req,res)=>{
    if (!req.query.allow){
        return res.redirect('/');
    }
    const course = await Course.findById(req.params.id).lean();
    res.render('course-edit',{
        title:"Редактирование",
        course
    })
})

router.post('/edit', async (req,res)=>{
    const {id} = req.body
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});


router.get('/:id',  async(req,res)=>{
    const course = await Course.findById(req.params.id).lean();

    res.render('course',{
        layout:'empty',
        title:`курс ${course.title}`,
        course
    })
})

router.post('/remove', async (req,res)=>{

    try {
        await Course.deleteOne({_id: req.body.id})
        res.redirect('/courses');
    }catch (e) {
        console.log(e)
    }
})

module.exports = router