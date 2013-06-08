var mongoose = require('mongoose');

var questionTestSchema = new mongoose.Schema({
	question: {
		type: String
	},
	a: {
		type: String
	},
	b: {
		type: String
	},
	c: {
		type: String
	},
	d: {
		type: String
	},
	aTrue: {
		type: Boolean
	},
	bTrue: {
		type: Boolean
	},
	cTrue: {
		type: Boolean
	},
	dTrue: {
		type: Boolean
	}
});

var testSchema = new mongoose.Schema({
	login_wyk: {
		type: String
	},
	name: {
		type: String
	},
	stop: {
		type: Date
	},
	status: {
		type: String
	},
	view: {
		type: String
	},
	question: [questionTestSchema]
});

exports.QuestionTest = mongoose.model('QuestionTest', questionTestSchema, 'questionTest');
exports.Test = mongoose.model('Test', testSchema, 'test');