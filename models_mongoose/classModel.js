var mongoose = require('mongoose');


var studentSchema = new mongoose.Schema({
	name: {
		type: String
	},
	surname: {
		type: String
	},
	login: {
		type: String
	}
});

var groupSchema = new mongoose.Schema({
	name: {
		type: String
	},
	student: [studentSchema]
});

var classSchema = new mongoose.Schema({
	login_wyk: {
		type: String
	},
	name: {
		type: String
	},
	student: [studentSchema],
	group: [groupSchema]

});


exports.Student = mongoose.model('Student', studentSchema, 'student');
exports.Group = mongoose.model('Group', groupSchema, 'group');
exports.Class = mongoose.model('Class', classSchema, 'class');