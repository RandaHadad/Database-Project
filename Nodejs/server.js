const sql = require('mssql');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const { request, response } = require('express');

const config = require("./dbConfig");
const UsersRoute = require("./Routers/UsersRoute");
const StudentsRouter = require("./Routers/StudentsRouter");

//opeining server
const app = express();

app.use(express.static('public'));
app.use('/CSS', express.static(__dirname + 'public/CSS'));
app.use('/Scripts', express.static(__dirname + 'public/Scripts'));



app.use(bodyParser.json());

const router = express.Router();

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
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/Login.html')
});

app.use((request, response, next) => {
    console.log(request.url, request.method);

    next();
    console.log("==========next======");
});

app.use('/user', UsersRoute);
app.use('/allstudent', StudentsRouter);



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