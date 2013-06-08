var mongoose = require('mongoose');


var answerSchema = new mongoose.Schema({
	idQuestion: {
		type: String
	},
	a: {
		type: Boolean
	},
	b: {
		type: Boolean
	},
	c: {
		type: Boolean
	},
	d: {
		type: Boolean
	}
});

var studentTestSchema = new mongoose.Schema({
	idTest: {
		type: String
	},
	answer: [answerSchema]
});

var studentTestsSchema = new mongoose.Schema({
	login: {
		type: String
	},
	test: [studentTestSchema]

});


exports.Answer = mongoose.model('Answer', answerSchema, 'answer');
exports.StudentTest = mongoose.model('StudentTest', studentTestSchema, 'studentTest');
exports.StudentTests = mongoose.model('StudentTests', studentTestsSchema, 'studentTests');