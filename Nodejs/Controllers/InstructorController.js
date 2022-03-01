const getStudentDegree = require("../Models/getStudentDegree");
const InstructorInfo = require("../Models/InstructorInfo");

exports.route = function(req, res) {
    let user = req.session.user;
    InstructorInfo.getInstructor(user.user_id, function(instructorinfo) {
        let stddrgree = [];
        if (instructorinfo.length == 1) {
            getStudentDegree.getDegree(instructorinfo[0].course_id, function(studentdeg) {
                stddrgree.push({
                    coursename: instructorinfo[0].course_name,
                    student: studentdeg
                })
                if (user) {
                    res.render('Instructor', {
                        id: instructorinfo[0].ins_id,
                        username: user.user_name,
                        address: instructorinfo[0].ins_address,
                        department: instructorinfo[0].dept_description,
                        coursename: instructorinfo[0].course_name,
                        students: stddrgree
                    })
                }
                console.log(studentdeg, instructorinfo[0])
            })
        } else {
            getStudentDegree.getDegree(instructorinfo[0].course_id, function(course1) {
                getStudentDegree.getDegree(instructorinfo[1].course_id, function(course2) {
                    stddrgree = [{
                            coursename: instructorinfo[0].course_name,
                            student: course1
                        },
                        {
                            coursename: instructorinfo[1].course_name,
                            student: course2
                        }
                    ]

                    if (user) {
                        res.render('Instructor', {
                            id: instructorinfo[0].ins_id,
                            username: user.user_name,
                            address: instructorinfo[0].ins_address,
                            department: instructorinfo[0].dept_description,
                            students: stddrgree
                        })
                    }
                })
            })
        }
    })
}