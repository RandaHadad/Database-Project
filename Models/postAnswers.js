const sql = require('mssql');
const config = require("./../dbConfig");


function postanswers(ex_id, st_id, ansarr, callback) {
    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        let query = `exec ExamAnswers @ex_id='${ex_id}', @st_id='${st_id}',
        @ans1='${ansarr[0]}', @ans2='${ansarr[1]}', @ans3='${ansarr[2]}', @ans4='${ansarr[3]}',
        @ans5='${ansarr[4]}', @ans6='${ansarr[5]}', @ans7='${ansarr[6]}', @ans8='${ansarr[7]}',
        @ans9='${ansarr[8]}', @ans10='${ansarr[9]}'`
        request.query(query, function(err, recordset) {
            if (err) console.log(err + "request error ");
            callback(recordset.recordset);
        })
    })
}

module.exports = { postanswers: postanswers };