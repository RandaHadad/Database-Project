const getStudentDegree = require("../Models/getStudentDegree");
const InstructorInfo = require("../Models/InstructorInfo");

exports.route = function(req, res) {
    let user = req.session.user;
    InstructorInfo.getInstructor(user.user_id, function(instructorinfo) {
        // let studentDegree=[]
        // for (let i = 0; i < instructorinfo; i++) {
        //     getStudentDegree.getDegree(instructorinfo[i].course_id, function(studentdeg) {

        //     })
        // }

        if (user) {
            console.log(instructorinfo[0])
            res.render('Instructor', {
                id: instructorinfo[0].ins_id,
                username: user.user_name,
                address: instructorinfo[0].ins_address,
                department: instructorinfo[0].dept_description

            })
        }

    })

}