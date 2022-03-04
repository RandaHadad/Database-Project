const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'ExaminationUser', // update me
            password: 'pass' // update me
        }
    },
    options: {
        database: 'Exam_System', // update me
        validateBulkLoadParameters: false,
        encrypt: false,
    }
};
module.exports = config;