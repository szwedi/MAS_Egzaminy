var mongoose = require('mongoose');

var Class = require('../models_mongoose/classModel').Class;
var Student = require('../models_mongoose/classModel').Student;

mongoose.connect('mongodb://pjwstk:pjwstk311@linus.mongohq.com:10037/eX4AJDngsak3Mk6bLAEsg');

	var mystudent1 = {
		name: 'a',
		surname: 'b',
		login: 'c'
	}

	var szwediStudent1 = new Student(mystudent1);

	var mystudent2 = {
		name: 'b',
		surname: 'c',
		login: 'd'
	}

	var szwediStudent2 = new Student(mystudent2);

	// var myclass = {
	// login_wyk: 'w0004',
	// name: 'PJWSTK'
	// }


	// var szwediClass = new Class(myclass);
	// szwediClass.save();

	Class.update({login_wyk : 'w0004'}, {$push: {student: szwediStudent2}}, function(err, data){
		console.log(err);
		console.log(data);
	});


mongoose.disconnect();