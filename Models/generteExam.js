const sql = require('mssql');
const config = require("./../dbConfig");


function generateexam(coursename, callback) {

    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        request.query("exec GenerateExam @course_name='" + coursename + "', @tofcount= 3 , @mcqcount =7  ",
            function(err, recordset) {
                if (err) console.log(err + "request error ");
                callback(recordset.recordset);
            })
    })
}

module.exports = { generateexam: generateexam };