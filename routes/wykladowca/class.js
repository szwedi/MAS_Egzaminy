var db = require('../../models_mysql/settings');
var mongoose = require('mongoose');
var Class = require('../../models_mongoose/classModel').Class;
var Student = require('../../models_mongoose/classModel').Student;
var Group = require('../../models_mongoose/classModel').Group;

exports.classPanel = function(req, res){
	Class.find({login_wyk : req.session.userLogin},function(err, result){
		res.render('wykladowca/class/classPanel', {data : result});
	});
};

exports.classPanelPost = function(req, res){
	var newClass = {
		login_wyk: req.session.userLogin,
		name: req.body.name
	}
	var newClassInSchema = new Class(newClass);
	newClassInSchema.save();
	res.redirect('/classPanel');
};

exports.createClass = function(req, res){
	res.render('wykladowca/class/createClass');
};

exports.viewClass = function(req, res) {
	var nameUrl = req.params.name;
	Class.find({name: nameUrl},function(err, result){
		res.render('wykladowca/class/viewClass', {name : nameUrl, data : result});
	});
};

exports.addStudent = function(req, res) {
	var nameUrl = req.params.name;
	db.Student.findAll().success(function(student){
		res.render('wykladowca/class/addStudent', {data : student, name : nameUrl});
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

exports.removeClass = function(req, res) {
	var idUrl = req.params.id;
	Class.remove({_id: idUrl}, function(err) {});
	res.redirect('/classPanel');
};

exports.removeStudent = function(req, res) {
	var classNameUrl = req.params.className;
	var idUrl = req.params.id;
	Class.update({name : classNameUrl},{$pull : {student : {_id : idUrl}}}, function(err){
		console.log(err);
	});
	res.redirect('/viewClass/' + classNameUrl);
};