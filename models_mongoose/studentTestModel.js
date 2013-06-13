var mongoose = require('mongoose');


var answerSchema = new mongoose.Schema({
	idQuestion: {
		type: String
	},
	a: {
		type: Boolean,
		default: false
	},
	b: {
		type: Boolean,
		default: false
	},
	c: {
		type: Boolean,
		default: false
	},
	d: {
		type: Boolean,
		default: false
	}
});

var studentTestSchema = new mongoose.Schema({
	idTest: {
		type: String
	},
	done : {
		type: Boolean
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