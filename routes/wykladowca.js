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
	Class.find({name: nameUrl},function(err, result){
		console.log(result);				//trzeba jakoś wycignć dane o studentach i zamieścić na stronie 
		//res.render('wykladowca/viewClass', {name : nameUrl, data : result});
	});
};

exports.addStudent = function(req, res) {
	var nameUrl = req.params.name;
	db.Student.findAll().success(function(student){
		res.render('wykladowca/addStudent', {data : student, name : nameUrl});
	});
};

exports.addStudentPost = function(req, res) {
	var nameUrl = req.params.name;
	for (var data in req.body) {
		db.Student.find({where: {login : data}}).success(function(student){
			var newStudent = {
				name: student.imie,
				surname: student.nazwisko,
				login: student.login
			}
			var newStudentInSchema = new Student(newStudent);
			Class.update({name : nameUrl}, {$push: {student: newStudentInSchema}}, function(err, data){});
		});
	};
	res.redirect('/viewClass/' + nameUrl);
};