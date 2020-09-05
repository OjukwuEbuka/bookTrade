const express = require('express');
const passport = require('passport')
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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
    const { firstName, lastName, userName, password, password2} = req.body;
    let errors = [];
    
    // check required fields
    if(!firstName || !lastName || !userName || !password || !password2){
        errors.push({msg: "Please fill in all fields"})
    }

    // check required fields
    if(password !== password2){
        errors.push({msg: "Passwords do not match"})
    }

    // check required fields
    if(password.length < 6){
        errors.push({msg: "Password should be at least 6 characters."})
    }

    if(errors.length > 0){
        res.render('register', {
            layout: 'login',
            errors: JSON.stringify(errors),
            firstName, lastName, userName, password, password2
        })
    } else {
        User.findOne({userName: userName})
            .then(user=>{
                if(user){
                    //userName exists
                    errors.push({msg: "Username already exists!"})
                    res.render('register', {
                        layout: 'login',
                        errors: JSON.stringify(errors),
                        firstName, lastName, userName, password, password2
                    })
                } else {                    
                    const newUser = new User({firstName, lastName, userName, password})
                    // Hash password
                    bcrypt.genSalt(10, (err, salt)=> 
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                            if(err) throw err;
                            // Set Password to hash
                            newUser.password = hash
                            // save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    console.log(user)
                                    res.redirect('/auth/login');
                                })
                                .catch(err=> console.log(err))
                        }))
                }
            })
        // res.send('pass')
    }
    console.log(req.body)
})

//@desc     Handle User Login
//@route    POST /
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(req, res, next)
})


//@desc    Logout user
//@route    GET /auth/logout
router.get('/logout',(req,res)=>{
        req.logout()
        req.flash('success_msg', 'You are logged out');
        res.redirect('/')
})



module.exports = router;