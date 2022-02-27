const sql = require('mssql');
const config = require("./../dbConfig");
const allusers = require("./../Models/UsersModel")
const { validationResult } = require("express-validator");

//get all students from database 
let allStudent = [];
allusers.getUsers(
    function(recordsetss) {
        allStudent = recordsetss;
    }
)

//get request 
exports.getUsers = function(req, res) {
    let type = req.query.type;
    sql.connect(config, function(err) {
        if (err) console.log(err + "from controller connect ");
        // create Request object  
        var request = new sql.Request();
        // query to the database and execute procedure   
        let query = "exec GetUsers  @Type='" + type + "';";
        request.query(query, function(error, recordset) {
            if (error) {
                console.log(error + "form controller request ");
                sql.close();
            }
            res.send(recordset)
        });
    });
}

exports.login = async(request, response, next) => {

    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    } else {
        const { username, password } = request.body;
        let x = allStudent.find((obj) => obj.user_name == username)
        if (x) {
            if (x.user_password == password) {
                console.log('you are loged in finally');
                request.session.user = x;
                response.redirect('/Home');
            } else {
                console.log("wrong password")
                request.flash("msg", "Wrong Password");
                response.locals.messages = request.flash();
                response.render('Login')
            }


        } else {
            console.log("wrong username");
            request.flash("msg", 'Wrong Username');
            response.locals.messages = request.flash();
            response.render('Login')
        }


    }


};