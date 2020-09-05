const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = passport => {
    passport.use(new LocalStrategy({
        userName: 'userName'
    }, async (userName, password, done)=>{
        //Match User
        try {
            const user = await User.findOne({userName: userName});
            if(!user) return done(null, false, {message: 'Incorrect username or password!'})
    
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
    
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect username or password!'})
                }
            })            
        } catch (error) {
            console.error(error)
        }
    })
    );
    
    passport.serializeUser((user,done) => done(null, user.id) )

    passport.deserializeUser((id,done) => {
        User.findById(id, (err,user) => done(err, user) )
    })
}