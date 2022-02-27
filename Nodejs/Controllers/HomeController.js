const generteExam = require("../Models/generteExam");
const getStudentCourse = require("../Models/getStudentCourse");
const getStudentInfo = require("../Models/getStudentInfo");

let info;

exports.stdHome = function(req, res) {
    let user = req.session.user;
    getStudentInfo.getstudentinfo(user.user_id,
        function(recordsets) {
            info = recordsets;
            getStudentCourse.getstudentcourses(user.user_id, function(courses) {
                if (user) {
                    res.render('Home', {
                        id: info[0].std_id,
                        username: info[0].std_name,
                        address: info[0].std_address,
                        department: info[0].dept_description,
                        course: courses
                    })
                }
            })

        }
    )
}

exports.examinfo = function(req, res) {
    console.log(req.body.id);
    console.log(JSON.stringify(info[0]))
    generteExam.generateexam(req.body.id, function(record) {
        console.log(JSON.stringify(record))
        res.render("Exam", {
            id: info[0].std_id,
            username: info[0].std_name,
            department: info[0].dept_description,
            examname: req.body.id,
            exam: record
        })
    })
}