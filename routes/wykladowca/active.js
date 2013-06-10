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
	Test.find({login_wyk : req.session.userLogin, status: 'prepared'},function(err, result){
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
	var idTestUrl = req.params.id;
	var viewBody = req.body.view;
	var klasa = req.body.class;
	Class.find({_id : req.body.class}, function(err, result){
		for (var i=0; i<result[0].student.length; i++) {
			console.log(result[0].student[i].login);
			StudentTests.find({login: result[0].student[i].login}, function(err, data){
				//coś tu napisać - nie dziala
				console.log('coscoscoscos');
			});
		};
	});
};