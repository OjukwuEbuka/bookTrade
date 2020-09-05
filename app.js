const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')

// load config
dotenv.config({path: './config/config.env'});

// passport config
require('./config/passport')(passport)

connectDB();

const app = express()

// Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// logging with morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars config
// exphbs.registerHelper('tern', function(first, sec){return first ? first : sec})
app.engine('.hbs', exphbs({
    defaultLayout:'main', 
    extname: '.hbs',
    helpers: {
        tern: (first, sec)=> first ? first : sec,
        toast: (foo, msg, cls) => foo({html: msg, classes: cls}, 4000)
    }
}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: "avenderaldora",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
    // cookie: {secure: true}
}))


// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash())

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
});



// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/books', require('./routes/books'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)