const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const Book = require('../models/Book');

//@desc     Show add page
//@route    GET /
router.get('/add', ensureAuth, (req, res) => {
    res.render('books/add')
})

//@desc     Process add form
//@route    POST /books
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Book.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})


module.exports = router;