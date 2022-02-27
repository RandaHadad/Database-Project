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
    console.log(request.body)
    console.log(allchoice)

    let data = [];
    postAnswers.postanswers(request.body.examid, request.body.stundentInfo, allchoice,
        function(recordsetss) {
            data = recordsetss;
            console.log(data)
            response.render('Final')
        }
    )

}