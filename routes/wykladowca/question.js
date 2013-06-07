var mongoose = require('mongoose');
var Category = require('../../models_mongoose/questionModel').Category;
var Question = require('../../models_mongoose/questionModel').Question;

exports.categoryPanel = function(req, res){
	Category.find({login_wyk : req.session.userLogin},function(err, result){
		res.render('wykladowca/question/categoryPanel', {data : result});
	});
};

exports.categoryPanelPost = function(req, res){
	var newCategory = {
		login_wyk: req.session.userLogin,
		name: req.body.name
	}
	var newCategoryInSchema = new Category(newCategory);
	newCategoryInSchema.save();
	res.redirect('/categoryPanel');
};

exports.createCategory = function(req, res){
	res.render('wykladowca/question/createCategory');
};

exports.viewCategory = function(req, res) {
	var nameUrl = req.params.name;
	Category.find({name: nameUrl},function(err, result){
		res.render('wykladowca/question/viewCategory', {name : nameUrl, data : result});
	});
};

exports.addQuestion = function(req, res) {
	var nameUrl = req.params.name;
	res.render('wykladowca/question/addQuestion');
};

exports.addQuestionPost = function(req, res) {
	var nameUrl = req.params.name;
	var answerA, answerB, answerC, answerD;
	if(req.body.a=='a')
		answerA = true;
	if(req.body.b=='b')
		answerB = true;
	if(req.body.c=='c')
		answerC = true;
	if(req.body.d=='d')
		answerD = true;
	var newQuestion = {
		question: req.body.question,
		a: req.body.answerA,
		b: req.body.answerB,
		c: req.body.answerC,
		d: req.body.answerD,
		aTrue: answerA,
		bTrue: answerB,
		cTrue: answerC,
		dTrue: answerD
	}
	var newQuestionInSchema = new Question(newQuestion);
	Category.update({name : nameUrl}, {$push: {question: newQuestionInSchema}}, function(err, data){});
	res.redirect('/viewCategory/' + nameUrl);
};