var mongoose = require('mongoose');
var Test = require('../../models_mongoose/testModel').Test;
var QuestionTest = require('../../models_mongoose/testModel').QuestionTest;
var Answer = require('../../models_mongoose/studentTestModel').Answer;
var StudentTest = require('../../models_mongoose/studentTestModel').StudentTest;
var StudentTests = require('../../models_mongoose/studentTestModel').StudentTests;
var StudentAnswer = require('../../models_mongoose/studentTestModel').Answer;


exports.studentTest = function(req, res){
	StudentTests.find({login : req.session.userLogin},function(err, result){

	});
};