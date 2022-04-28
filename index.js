const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders');
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const mogoose = require('mongoose')
const User = require('./models/user')



const app = express()
const hbs = exphbs.create({
    defaultLayout:'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.use ( async (req, res, next)=>{
    try {
        const user = await User.findById('62647fab6f2acc122b1c515f')
        req.user = user;
        next();
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));

app.use('/',homeRoutes);
app.use('/courses',coursesRoutes);
app.use('/add',addRoutes);
app.use('/card',cardRoutes);
app.use('/orders',ordersRoutes);

const pass = 'q99akHptguarGWA5'

async function start(){
    try {
        const PORT= process.env.PORT || 3000
        const url  = "mongodb+srv://evgen:aUAqEDC8PmmgW6rE@cluster1.agwws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        await mogoose.connect(url, {useNewUrlParser:true});
        const candidate = await User.findOne()
        if (!candidate){
            const user = new User({
                email: 'evgen@mail.ru',
                name: 'evgen',
                cart:{items:[]}
            })
            await user.save()
        }
        app.listen(PORT,()=>{
            console.log(`server was been started ${PORT}`)
        })

    }catch (e) {
        console.log(e)
    }

}

start()

