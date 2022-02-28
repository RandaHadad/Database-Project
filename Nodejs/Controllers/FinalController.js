const examCorrection = require("../Models/examCorrection");
const postAnswers = require("../Models/postAnswers");

exports.start = async(request, response) => {
    response.render('Final')
}
exports.sendans = async(request, response) => {
    let allchoice = [];
    for (const key in request.body) {
        allchoice.push(request.body[key])
    }
    allchoice.splice(0, 4)



    postAnswers.postanswers(request.body.examid, request.body.stundentInfo, allchoice,
        function(recordsetss) {
            examCorrection.examcorrection(request.body.stundentInfo, request.body.examid,
                function(recordsets) {
                    response.render('Final')
                })

        }
    )

}