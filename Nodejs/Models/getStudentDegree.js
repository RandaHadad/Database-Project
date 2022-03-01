const sql = require('mssql');
const config = require("./../dbConfig");


function getDegree(courseid, callback) {

    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        let query = `exec selectStudentsWithGrades @courseID=${courseid}`
        request.query(query, function(err, recordset) {
            if (err) console.log(err + "request error ");
            callback(recordset.recordset);
        })
    })
}

module.exports = { getDegree: getDegree };