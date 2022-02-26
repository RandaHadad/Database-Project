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
            console.log(JSON.stringify(allStudent));
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
        //let x = allStudent.find((obj) => obj.user_name == username)
        for (let index = 0; index < allStudent.length; index++) {
            if (allStudent[index].user_name == username && allStudent[index].user_password == password) {
                console.log('you are loged in finally');
                response.render('home')
                response.status(201).json({ message: "Logged" });
                break;
            } else {
                console.log("you entered some thing wrong ");
            }

        }
        //console.log(x);

    }


};