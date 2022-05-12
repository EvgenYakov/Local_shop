const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session)
const csrf = require('csurf');

const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const ordersRoutes = require('./routes/orders');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user')

const MONGODB_URI  = "mongodb+srv://evgen:aUAqEDC8PmmgW6rE@cluster1.agwws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const app = express()
const hbs = exphbs.create({
    defaultLayout:'main',
    extname: 'hbs'
})

const store = new MongoStore({
    collection: 'sessions',
    uri:MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'some',
    resave:'false',
    saveUninitialized: 'false',
    store
}))
app.use(csrf())
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/',homeRoutes);
app.use('/courses',coursesRoutes);
app.use('/add',addRoutes);
app.use('/card',cardRoutes);
app.use('/orders',ordersRoutes);
app.use('/auth', authRoutes);

const pass = 'q99akHptguarGWA5'

async function start(){
    try {
        const PORT= process.env.PORT || 3000

        await mongoose.connect(MONGODB_URI, {useNewUrlParser:true});

        app.listen(PORT,()=>{
            console.log(`server was been started ${PORT}`)
        })

    }catch (e) {
        console.log(e)
    }

}

start()

