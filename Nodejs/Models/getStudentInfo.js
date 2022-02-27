const sql = require('mssql');
const config = require("./../dbConfig");


function getstudentinfo(userid, callback) {

    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        request.query("exec StudentInfo @stuid='" + userid + "'", function(err, recordset) {
            if (err) console.log(err + "request error ");
            // console.log(JSON.stringify(recordset.recordset) + "new proc")
            callback(recordset.recordset);
        })
    })
}

module.exports = { getstudentinfo: getstudentinfo };