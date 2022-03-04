const sql = require('mssql');
const config = require("./../dbConfig");


function getstudentcourses(userid, callback) {

    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        request.query("exec StudentInfoCourse @stuid='" + userid + "'", function(err, recordset) {
            if (err) console.log(err + "request error ");
            callback(recordset.recordset);
        })
    })
}

module.exports = { getstudentcourses: getstudentcourses };