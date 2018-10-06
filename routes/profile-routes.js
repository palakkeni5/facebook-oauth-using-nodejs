const router = require('express').Router();

router.get('/', (req, res)=>{
    //console.log(req.users)

    res.send('This is your profile ')
})

module.exports = router