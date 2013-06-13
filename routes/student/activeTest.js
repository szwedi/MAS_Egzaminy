var mongoose = require('mongoose');
var Test = require('../../models_mongoose/testModel').Test;
var QuestionTest = require('../../models_mongoose/testModel').QuestionTest;
var Answer = require('../../models_mongoose/studentTestModel').Answer;
var StudentTest = require('../../models_mongoose/studentTestModel').StudentTest;
var StudentTests = require('../../models_mongoose/studentTestModel').StudentTests;
var StudentAnswer = require('../../models_mongoose/studentTestModel').Answer;


exports.studentTest = function(req, res){
	var studentTest = [];
	var getStudentTests = function(callback){
		StudentTests.find({login : req.session.userLogin},function(err, result){
			for(var i=0; i<result[0].test.length; i++){
				if(result[0].test[i].done == false)
					callback(result[0].test[i].idTest);
			}
		});
	};
	getStudentTests(function(idTest){
		Test.find({_id : idTest},function(err,data){
			studentTest.push(data[0]);
		});
	});
	setTimeout(function(){
		res.render('student/active/activeTest', {data : studentTest});
	},2000);
};

exports.activeTest = function(req,res){
	var idTestUrl = req.params.id;
	Test.find({_id: req.params.id}, function(err,data){
		res.render('student/active/test', {data : data});
	});
};

exports.activeTestPost = function(req,res){

};