const {Router} = require("express");
const router = Router();
const Course = require('../models/course')

router.get('/',async (req,res)=>{
    const courses =await Course.getAll();
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
    const course = await Course.getByid(req.params.id)
    res.render('course-edit',{
        title:"Редактирование",
        course
    })
})

router.post('/edit', async (req,res)=>{
    await Course.editCourse(req.body);
    res.redirect('/courses');
});


router.get('/:id',  async(req,res)=>{
    const course = await Course.getByid(req.params.id)
    res.render('course',{
        layout:'empty',
        title:`курс ${course.title}`,
        course
    })
})

module.exports = router