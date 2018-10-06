const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/login' }),
     (req, res)=>{
            //res.send(req.user );
            //
            console.log(req.user)
            res.redirect('/profile/')

})

router.get('/logout',(req,res)=>{
    res.send('logout page .....handling with passport later')
})

router.get('/facebook', passport.authenticate('facebook',{ authType: 'rerequest', scope: ['email'] }) 
)

module.exports=router;