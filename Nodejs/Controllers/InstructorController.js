const InstructorInfo = require("../Models/InstructorInfo");

exports.route = function(req, res) {
    let user = req.session.user;
    InstructorInfo.getInstructor(user.user_id, function(recordsets) {
        if (user) {
            console.log(recordsets[0])
            res.render('Instructor', {
                id: recordsets[0].ins_id,
                username: user.user_name,
                address: recordsets[0].ins_address,
                department: recordsets[0].dept_description

            })
        }
    })

}