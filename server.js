const sql = require('mssql');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');

var flash = require('connect-flash');
const config = require("./dbConfig");
const UsersRoute = require("./Routers/UsersRoute");
const InsRoute = require("./Controllers/InstructorController");
const HomeRoute = require("./Routers/HomeRouter");
const FinalRouter = require("./Routers/FinalRouter");

//opeining server
const app = express();

app.use(flash());
// for body parser. to collect data that sent from the client.
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//Static Files
// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

//Set Views 
app.set('views', './views')
app.set('view engine', 'ejs')


// session
app.use(session({
    secret: 'youtube_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

//1- openinign DB Connection
sql.on('error', err => { console.log(err.messages) })


sql.connect(config)
    .then(
        () => {
            console.log("DB Connected");
            app.listen(process.env.PORT || 8080, () => {
                console.log("I am listening ......")
            });

        })
    .catch(error => {
        console.log("DB Conection Problem");
        console.log(error);

    })


//=================================================================
//firstMW--> save log file
app.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
    console.log("==========next======");
});

app.use('/user', UsersRoute);
app.use('/final', FinalRouter);
app.use('/home', HomeRoute);
app.get('/', (req, res) => {
    res.render('login')
});
app.get('/instructor', InsRoute.route);
app.get('/exam', (req, res) => {
    res.render('Exam')
});

// Get loggout page
app.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if (req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});