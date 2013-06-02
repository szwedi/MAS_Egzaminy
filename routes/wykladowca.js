var db = require('../models_mysql/settings');
var mongoose = require('mongoose');
var Class = require('../models_mongoose/classModel').Class;
var Student = require('../models_mongoose/classModel').Student;
var Group = require('../models_mongoose/classModel').Group;

exports.classPanel = function(req, res){
	Class.find({},function(err, result){
		res.render('wykladowca/classPanel', {data : result});
	});
};

exports.classPanelPost = function(req, res){
	var newClass = {
		login_wyk: 'tymczasowo',	//tu trzeba wstawić login wykladowcy tylko jeszcze nie wiem jak ;p
		name: req.body.name
	}
	var newClassInSchema = new Class(newClass);
	newClassInSchema.save();
	res.redirect('/classPanel');
};

exports.createClass = function(req, res){
	res.render('wykladowca/createClass');
};

exports.viewClass = function(req, res) {
	var nameUrl = req.params.name;
	res.render('wykladowca/viewClass', {name : nameUrl});
};

exports.addStudent = function(req, res) {
	var nameUrl = req.params.name;
	db.Student.findAll().success(function(student){
		res.render('wykladowca/addStudent', {data : student, name : nameUrl});
	});
};

exports.addStudentPost = function(req, res) {
	var nameUrl = req.params.name;
	console.log('0: ' + req.body.checkbox0);
	console.log('1: ' + req.body.checkbox1);
	console.log('2: ' + req.body.checkbox2);
	console.log('3: ' + req.body.checkbox3);
	//tu jakaś petla for która sprawdza czy zostaly zaznaczone checkboxy i jezeli zaznaczone to przerzucamy studentow do klasy
	res.redirect('/viewClass/' + nameUrl);
};