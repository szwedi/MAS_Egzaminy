var mongoose = require('mongoose');
var Test = require('../../models_mongoose/testModel').Test;
var QuestionTest = require('../../models_mongoose/testModel').QuestionTest;
var Category = require('../../models_mongoose/questionModel').Category;


exports.testPanel = function(req, res){
	Test.find({login_wyk : req.session.userLogin},function(err, result){
		res.render('wykladowca/test/testPanel', {data : result});
	});
};

exports.createTestAutomat = function(req, res){
	Category.find({login_wyk : req.session.userLogin},function(err, result){
		res.render('wykladowca/test/createTestAutomat', {data : result});
	});
};

exports.addQuestionNumberAutomatPost = function(req, res) {
	var newTest = {
		login_wyk: req.session.userLogin,
		name: req.body.name
	};
	var newTestInSchema = new Test(newTest);
	newTestInSchema.save();
	Category.find({login_wyk : req.session.userLogin, name: req.body.category},function(err, result) {
		res.render('wykladowca/test/createTestAutomatNumber', {data : result, name : req.body.name, category : req.body.category});
	});
};

exports.addQuestionViewAutomatPost = function(req, res) {
	Category.find({login_wyk : req.session.userLogin, name: req.body.category},function(err, result) {
		for(var i=0; i<req.body.number; i++) {
			console.log('pytanie' + i);   //uzupec cos tu -----------------------------------------------------
		}
	});
	res.render('wykladowca/test/createTestAutomatView');
};

exports.removeTest = function(req, res) {
	var idUrl = req.params.id;
	Test.remove({_id: idUrl}, function(err) {});
	res.redirect('/testPanel');
};