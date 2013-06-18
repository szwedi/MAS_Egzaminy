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
			if (result.length > 0){
				for(var i=0; i<result[0].test.length; i++){
					if(result[0].test[i].done == false)
						callback(result[0].test[i].idTest);
				}
			}
		});
	};
	getStudentTests(function(idTest){
		Test.find({_id : idTest},function(err,data){
			if (data[0].status == 'active')
				studentTest.push(data[0]);
		});
	});
	setTimeout(function(){
		res.render('student/active/activeTest', {data : studentTest});
	},2000);
};

exports.activeTest = function(req,res){
	Test.find({_id: req.params.id}, function(err,data){
		res.render('student/active/test', {data : data});
	});
};

exports.activeTestPost = function(req,res){
	var idTestUrl = req.params.id;
	for (var data in req.body) {
		var idQuestion = data.slice(0,-1);
		var answer = data.slice(-1);
		StudentTests.find({login: req.session.userLogin, 'test.idTest' : idTestUrl, 'test.answer.idQuestion' : idQuestion}, function(err, data){
			console.log(data);
			if(data.length == 0){
				var studentAnswer = {
					idQuestion: idQuestion
				};
				var studentAnswerInSchema = new StudentTest(studentAnswer);
				// do poprawy jeszcze nie dodaje pytania jakiś blad w pushu ...
				StudentTests.update({login: req.session.userLogin, 'test.idTest' : idTestUrl},{$push: {answer: studentAnswerInSchema}}, function(err){
					if (err)
						console.log(err);
				});
			}
			//ustawienie odpowiedzi
		});
	}
};