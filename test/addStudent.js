var mongoose = require('mongoose');

var Class = require('../models_mongoose/classModel').Class;
var Student = require('../models_mongoose/classModel').Student;

mongoose.connect('mongodb://pjwstk:pjwstk311@linus.mongohq.com:10037/eX4AJDngsak3Mk6bLAEsg');

// var mystudent = {
// 	name: 'Adam',
// 	surname: 'Szwedowski',
// 	login: 's0001'
// }

// 		var cos = new Student(mystudent);


// Class.update({}, {$set: { student: cos}}, {upsert: true});
// 

Class.find({}, function  (err, result) {
	console.log(result.size);
	mongoose.disconnect();
});


