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
		login_wyk: 'tymczasowo',
		name: req.body.name
	}
	var newClassInSchema = new Class(newClass);
	newClassInSchema.save();
	res.redirect('/classPanel');
};

exports.createClass = function(req, res){
	res.render('wykladowca/createClass');
};