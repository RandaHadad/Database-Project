const StudentInfo = require("./../Models/StudentInfo")


//get all students from database 
let studentarray = [];
StudentInfo.getStudent(
    function(recordsetss) {
        studentarray = recordsetss;
    }
)
exports.stdHome = function(req, res) {
    let user = req.session.user;
    console.log(JSON.stringify(studentarray));
    let x = studentarray.find((obj) => obj.user_std == user.user_id)
    console.log(JSON.stringify(x));
    if (user) {
        res.render('Home', {
            id: x.std_id,
            username: x.std_name,
            address: x.std_address,
            department: x.dept_description,
        })
    }
}