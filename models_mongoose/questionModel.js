var mongoose = require('mongoose');


var questionSchema = new mongoose.Schema({
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

var categorySchema = new mongoose.Schema({
	login_wyk: {
		type: String
	},
	name: {
		type: String
	},
	question: [questionSchema]
});


exports.Question = mongoose.model('Question', questionSchema, 'question');
exports.Category = mongoose.model('Category', categorySchema, 'category');