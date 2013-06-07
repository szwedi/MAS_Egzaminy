var mongoose = require('mongoose');

var Class = require('../models_mongoose/classModel').Class;
var Student = require('../models_mongoose/classModel').Student;
var Group = require('../models_mongoose/classModel').Group;

mongoose.connect('mongodb://pjwstk:pjwstk311@linus.mongohq.com:10037/eX4AJDngsak3Mk6bLAEsg');

// var mystudent1 = {
// 	name: 'a',
// 	surname: 'b',
// 	login: 'c'
// }

// var szwediStudent1 = new Student(mystudent1);

// var mystudent2 = {
// 	name: 'b',
// 	surname: 'c',
// 	login: 'd'
// }

// var szwediStudent2 = new Student(mystudent2);

// var myclass = {
// login_wyk: 'w0004',
// name: 'PJWSTK'
// }


// var szwediClass = new Class(myclass);
// szwediClass.save();

// Class.update({login_wyk : 'w0004'}, {$push: {student: szwediStudent2}}, function(err, data){
// 	console.log(err);
// 	console.log(data);
// });

// Class.remove({
// 	_id: '51ab0425e2a7ce2009000002'
// }, function(err) {
// 	if (!err) {
// 		console.log('usunieto');
// 	} else {
// 		console.log('error');
// 	}


//  Class.find({_id : '51ab09b69b1e26ec10000002'}, function(error, cos) {
// 	console.log('OBJECT BEFORE CALLING ONE REMOVE: \n' + cos);
 
// 	// First, remove just one before saving:
// 	cos[0].student[0].remove();
// 	console.log('\n[0] REMOVE');
// 	console.log('\nOBJECT BEFORE SAVE: \n' + cos);
 
// 	cos[0].save();
// });
// 
// 


// Class.update({_id : '51ad82037350a91013000002'},{$pull : {student : {_id : '51ad821c7350a91013000005'}}}, function(err){
// 	console.log(err);
// });

//mongoose.disconnect();