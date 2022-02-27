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
                        course: courses,
                    })
                }
            })

        }
    )
}

exports.examinfo = function(req, res) {
    generteExam.generateexam(req.body.name, function(record) {

        let intque
        let i = 0;
        let j = 1
        let exam = [];
        let choices = [];
        let start = true;

        while (j < record.length) {
            intque = record[i].que_body;
            let nxtque = record[j].que_body;
            if (start) {
                choices.push({
                    choiceChar: record[i].choice_char,
                    choiceDescription: record[i].choice_description
                })
            }
            if (intque == nxtque) {
                start = false;
                choices.push({
                    choiceChar: record[j].choice_char,
                    choiceDescription: record[j].choice_description
                })
                j++;
            } else if (intque != nxtque) {
                start = true;
                exam.push({
                    question: intque,
                    queChoices: choices
                })
                choices = [];
                i = j;
                j++;
            }
        }
        exam.push({
            question: intque,
            queChoices: choices
        })

        res.render("Exam", {
            studinfo: info[0].std_id,
            courseid: req.body.id,
            examname: req.body.name,
            examid: record[0].exam_id,
            exam: exam
        })
    })
}