const sql = require('mssql');
const config = require("./../dbConfig");


function getInstructor(userid, callback) {

    var connection = new sql.connect(config, function(err) {
        if (err) console.log(err + "did not connect to sql");
        //check the error
        var request = new sql.Request(connection);
        let query = `select i.ins_name,i.ins_id,i.ins_address ,d.dept_name ,d.dept_description 
        from  Department d inner join  Instructor i  on d.dept_id=i.ins_dept
        where i.user_ins= ${userid}`
        request.query(query, function(err, recordset) {
            if (err) console.log(err + "request error ");
            callback(recordset.recordset);
        })
    })
}

module.exports = { getInstructor: getInstructor };