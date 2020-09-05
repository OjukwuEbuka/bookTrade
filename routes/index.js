const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const Book = require('../models/Book');

//@desc     Login/Landing page
//@route    GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('welcome', {
        layout: 'login'
    })
})


//@desc     Dashboard
//@route    GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const books = await Book.find({user: req.user.id}).lean()
        console.log(books);
        res.render('dashboard', {
            name: req.user.firstName, books
        })
    } catch (err) {
        console.error(err)
    }

})


module.exports = router;