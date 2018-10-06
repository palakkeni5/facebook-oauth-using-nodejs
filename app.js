const express = require ('express')
const https = require('https')
const fs = require('fs')
const cookieSession =require('cookie-session')
const passport=require('passport')
const mongoose =require('mongoose')
 
const authRoutes =require('./routes/auth-routes')
const profileRoutes =require('./routes/profile-routes')

const passportSetup =require('./config/passport-setup');
const keys = require('./config/keys')


const app=express();
const options = {
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

mongoose.connect(keys.mongodb.dbURI ,{useNewUrlParser: true }, ()=>{
    console.log('connected to mongodb')
})

// app.use (cookieSession({
//     maxAge:24*60*60*1000,
//     keys : [keys.session.cookieKey]
// }))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine','ejs')

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)


app.get('/',(req, res)=>{
    res.render('home')  
})

var server = https.createServer(options, app).listen(3000, function(){
    console.log("server started at port 3000");
})