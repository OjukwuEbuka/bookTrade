const express = require('express');
const passport = require('passport')
const router = express.Router();

//@desc     Register new User
//@route    GET /
router.get('/register', (req, res)=>{
    res.render('register', {
        layout: 'login'
    })
})

//@desc     User Login
//@route    GET /
router.get('/login', (req, res)=>{
    res.render('login', {
        layout: 'login'
    })
})


//@desc     Handle User Regoster
//@route    POST /
router.post('/register', (req, res)=>{
    const { firstName, lastName, username, password, password2} = req.body;
    let errors = [];
    
    // check required fields
    if(!firstName || !lastName || !username || !password || !password2){
        errors.push({msg: "Please fill in all fields"})
    }

    // check required fields
    if(password !== password2){
        errors.push({msg: "Passwords do not match"})
    }

    // check required fields
    if(password.length < 6){
        errors.push({msg: "Passwords should be at least 6 characters."})
    }

    if(errors.length > 0){
        res.render('register', {
            layout: 'login',
            errors: JSON.stringify(errors),
            firstName, lastName, username, password, password2
        })
    } else {
        res.send('pass')
    }
    console.log(req.body)
})

//@desc     Handle User Login
//@route    POST /
router.post('/login', (req, res)=>{
    
})


//@desc    Logout user
//@route    GET /auth/logout
router.get('/logout',(req,res)=>{
    req.session.destroy((e) => {
        req.logout()
        res.redirect('/')
    })
})



module.exports = router;