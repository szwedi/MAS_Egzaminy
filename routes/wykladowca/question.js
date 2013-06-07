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
	res.render('wykladowca/question/addQuestion',{name : nameUrl});
};

exports.addQuestionPost = function(req, res) {
	var nameUrl = req.params.name;
	var answerA, answerB, answerC, answerD;
	if(req.body.a=='a')
		answerA = true;
	else
		answerA = false;
	if(req.body.b=='b')
		answerB = true;
	else
		answerB = false;
	if(req.body.c=='c')
		answerC = true;
	else
		answerC = false;
	if(req.body.d=='d')
		answerD = true;
	else
		answerD = false;
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

exports.removeCategory = function(req, res) {
	var idUrl = req.params.id;
	Category.remove({_id: idUrl}, function(err) {});
	res.redirect('/categoryPanel');
};

exports.removeQuestion = function(req, res) {
	var categoryNameUrl = req.params.categoryName;
	var idUrl = req.params.id;
	Category.update({name : categoryNameUrl},{$pull : {question : {_id : idUrl}}}, function(err){
		if (err)
			console.log(err);
	});
	res.redirect('/viewCategory/' + categoryNameUrl);
};