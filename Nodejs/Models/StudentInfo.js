const sql = require('mssql');
const config = require("./../dbConfig");


function getStudent(callback) {

    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        request.query("exec AllStudent ", function(err, recordset) {
            if (err) console.log(err + "request error ");
            // console.log(JSON.stringify(recordset.recordset) + "from the model")
            callback(recordset.recordset);
        })
    })
}

module.exports = { getStudent: getStudent };