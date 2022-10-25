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
const port = 4000;

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
    resave: false
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

app.listen(port, () => {
    console.log("Server Started at port || ", port);
})