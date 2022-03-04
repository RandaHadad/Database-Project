const sql = require('mssql');
const config = require("./../dbConfig");

exports.getStudents = function(req, res) {
        sql.connect(config, function(err) {
            if (err) console.log(err);
            // create Request object  
            var request = new sql.Request();
            // query to the database and execute procedure   
            let query = "exec AllStudent ;";
            request.query(query, function(error, recordset) {
                if (error) {
                    console.log(error);
                    sql.close();
                }
                res.send(recordset);
                sql.close();
            });
        });
    } //end of server use