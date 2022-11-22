const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const path = require('path')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const db = require('./config/connection')
const MongoDBSession = require('connect-mongodb-session')(session);
require('dotenv').config();

const store = new MongoDBSession({
    uri: process.env.DB_SERVER,
    collection: 'MySession'
})

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
     },
    resave: false,
    store: store
}));
app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});
app.use(cookieParser());
db.connect((err) => {
    if (err)
        console.log("DataBase Connection Fail" + err);
    else
        console.log("Database Connected Successfully");
})

app.set('views', path.join(__dirname, 'views'))
app.set('layout', './layout/layout')
app.set('view engine', 'ejs')

app.use('/admin', adminRouter)
app.use('/',userRouter)

// Handling non matching request from the client
app.get('*',(req,res)=>{
    res.render('pageNotFound',{admin:false,user:false})
})

app.listen(process.env.PORT, () => {
    console.log("listening to port 4000 .🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃");
})