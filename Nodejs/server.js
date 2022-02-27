const sql = require('mssql');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');

var flash = require('connect-flash');
const config = require("./dbConfig");
const UsersRoute = require("./Routers/UsersRoute");
const HomeRoute = require("./Routers/HomeRouter");
const StudentsRouter = require("./Routers/StudentsRouter");

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
app.get('/', (req, res) => {
    res.render('login')
});
app.use('/Home', HomeRoute)

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


// server.use('/alluser', (req, res) => {

//     sql.connect(config, function(err) {
//         if (err) console.log(err);
//         // create Request object  
//         var request = new sql.Request();
//         // query to the database and execute procedure   
//         let query = "exec AllUsers ;";
//         console.log(query)
//         request.query(query, function(error, recordset) {
//             if (error) {
//                 console.log(error);
//                 sql.close();
//             }
//             res.send();
//             sql.close();
//         });
//     });
// }); //end of server use 

// server.use('/alldepartment', (req, res) => {

//     sql.connect(config, function(err) {
//         if (err) console.log(err);
//         // create Request object  
//         var request = new sql.Request();
//         // query to the database and execute procedure   
//         let query = "exec AllDepartments  ;";
//         console.log(query)
//         request.query(query, function(error, recordset) {
//             if (error) {
//                 console.log(error);
//                 sql.close();
//             }
//             res.send();
//             sql.close();


//         });
//     });
// }); //end of server use 

// server.use('/allinstructor', (req, res) => {

//     sql.connect(config, function(err) {
//         if (err) console.log(err);
//         // create Request object  
//         var request = new sql.Request();
//         // query to the database and execute procedure   
//         let query = "exec AllInstructor  ;";
//         console.log(query)
//         request.query(query, function(error, recordset) {
//             if (error) {
//                 console.log(error);
//                 sql.close();
//             }
//             sql.close();
//             res.send(recordset);


//         });
//     });
// }); //end of server use