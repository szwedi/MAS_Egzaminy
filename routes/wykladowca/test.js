var mongoose = require('mongoose');
var Test = require('../../models_mongoose/testModel').Test;
var QuestionTest = require('../../models_mongoose/testModel').QuestionTest;
var Category = require('../../models_mongoose/questionModel').Category;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function contains(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

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
		name: req.body.name,
		status: 'prepared'
	};
	var newTestInSchema = new Test(newTest);
	newTestInSchema.save();
	Category.find({login_wyk : req.session.userLogin, name: req.body.category},function(err, result) {
		res.render('wykladowca/test/createTestAutomatNumber', {data : result, name : req.body.name, category : req.body.category});
	});
};

exports.addQuestionViewAutomatPost = function(req, res) {
	Category.find({login_wyk : req.session.userLogin, name: req.body.category},function(err, result) {
		var questionTab = [];
		for(; questionTab.length<=req.body.number;) {
			var numb = getRandomInt(0, result[0].question.length);
			if(!contains(questionTab,numb))
				questionTab.push(numb);
		}
		for(var i=0; i<questionTab.length; i++){
			Test.update({name : req.body.name}, {$push: {question: result[0].question[questionTab[i]]}}, function(err, data){});
		}
	});
	res.render('wykladowca/test/createTestAutomatView');
};

exports.createTestManual = function(req, res){
	Category.find({login_wyk : req.session.userLogin},function(err, result){
		res.render('wykladowca/test/createTestManual', {data : result});
	});
};

exports.addQuestionViewManualPost = function(req, res) {
	Category.find({login_wyk : req.session.userLogin, name: req.body.category},function(err, result) {
		res.render('wykladowca/test/createTestManualView', {data : result, name : req.body.name, category : req.body.category});
		//nie przekazuje category do widoku nie wiem czemu
	});
};

exports.addQuestionSaveManualPost = function(req, res) {
	for (var data in req.body) {
		console.log('login: ' + req.session.userLogin);
		console.log('category: ' + req.body.category);
		console.log('data: ' + data);
		Category.find({login_wyk : req.session.userLogin, name: req.body.category},function(err, result) {
			//console.log(result); 
			/// uzupelnic ///
		});
	};
};

exports.viewTest = function(req, res) {
	var nameUrl = req.params.name;
	Test.find({name: nameUrl},function(err, result){
		res.render('wykladowca/test/viewTest', {name : nameUrl, data : result});
	});
};

exports.removeTest = function(req, res) {
	var idUrl = req.params.id;
	Test.remove({_id: idUrl}, function(err) {});
	res.redirect('/testPanel');
};