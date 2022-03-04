const sql = require('mssql');
const config = require("./../dbConfig");


function examcorrection(st_id, ex_id, callback) {
    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        let query = `exec ExamCorrection @stID='${st_id}', @examID='${ex_id}' `
        request.query(query, function(err, recordset) {
            if (err) console.log(err + "request error ");
            callback(recordset.recordset);
        })
    })
}

module.exports = { examcorrection: examcorrection };