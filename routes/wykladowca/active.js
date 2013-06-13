var mongoose = require('mongoose');
var Test = require('../../models_mongoose/testModel').Test;
var QuestionTest = require('../../models_mongoose/testModel').QuestionTest;
var Answer = require('../../models_mongoose/studentTestModel').Answer;
var StudentTest = require('../../models_mongoose/studentTestModel').StudentTest;
var StudentTests = require('../../models_mongoose/studentTestModel').StudentTests;
var Class = require('../../models_mongoose/classModel').Class;
var Student = require('../../models_mongoose/classModel').Student;
var Group = require('../../models_mongoose/classModel').Group;

exports.activePanel = function(req, res){
	Test.find({login_wyk : req.session.userLogin, $or: [{status: 'prepared'},{status: 'active'}]},function(err, result){
		res.render('wykladowca/active/activePanel', {data : result});
	});
};

exports.activeTest = function (req, res) {
	var idUrl = req.params.id;
	Test.find({login_wyk : req.session.userLogin, _id : idUrl},function(err, result){
		Class.find({login_wyk : req.session.userLogin},function(err,data) {
			res.render('wykladowca/active/activeTest', {name : result[0].name, data : data, id : idUrl});
		});
	});
};

exports.activeTestPost = function (req, res) {
	// var idTestUrl = req.params.id;
	// var viewBody = req.body.view;
	// var klasa = req.body.class;
	var student = [];
	var findClass = function(callback){
		Class.find({_id : req.body.class}, function(err, result){
			for (var i=0; i<result[0].student.length; i++) {
				callback(result[0].student[i].login);
			}
		});
	};
	findClass(function(student){
		StudentTests.find({login: student}, function(err, data){
			if(data.length == 0){
				var studentTest = {
					idTest: req.params.id,
					done: false
				};
				var studentTestInSchema = new StudentTest(studentTest);
				var studentTests = {
					login: student,
					test: studentTestInSchema
				};
				var studentTestsInSchema = new StudentTests(studentTests);
				studentTestsInSchema.save();
			}
			else{
				var studentTest = {
					idTest: req.params.id,
					done: false
				};
				var studentTestInSchema = new StudentTest(studentTest);
				StudentTests.update({login: student},{$push: {test: studentTestInSchema}}, function(err){
					if (err)
						console.log(err);
				});
			}
		});
	});
	Test.update({_id : req.params.id},{$set: {status : 'active', view : req.body.view}}, function(err){
		if(err)
			console.log(err);
	});
	res.render('wykladowca/active/activatedTest');
};

exports.deactiveTest = function(req, res){
	Test.update({_id : req.params.id},{$set: {status : 'inactiv'}}, function(err){
		if(err)
			console.log(err);
	});
	res.render('wykladowca/active/deactivatedTest');
};