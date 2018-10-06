const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys =require('./keys');
const User =require('../models/user-model')

passport.serializeUser((user,done)=>{
    //console.log(user._id)
    done(null, user._id)
})

passport.deserializeUser((id,done)=>{
    User.findOne({_id: id}).then((user)=>{
        done(null, user)
    })
})

passport.use(
    new FacebookStrategy({
        //options for facebook strategy...please configure these options
        clientID: keys.facebook.clientID ,
        clientSecret: keys.facebook.clientSecret ,
        callbackURL: 'https://localhost:3000/auth/facebook/redirect'
    } ,(accessToken, refreshToken, profile, done)=>{
        //passport callback function
        console.log('callback function fired');
        console.log(accessToken)
        console.log(refreshToken)
        console.log( profile )
        User.findOne({facebookId:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user is :',currentUser)
                done(null, currentUser);
            }else{
                new User({
                    username: profile.displayName,
                    facebookId : profile.id
                }).save().then((newUser)=>{
                    console.log('new user created :', newUser)
                    done(null, newUser);
                })
            }
        })
    })
)