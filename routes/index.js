var db = require('../models_mysql/settings');

exports.index = function(req, res){
	res.render('index');
};

exports.loginPanel = function(req, res){
	res.render('loginPanel');
};

exports.login = function(req, res){
	db.Student.find({where: {login : req.body.login, pass: req.body.password}}).success(function(student){
		if(student != null){
			req.session.userLogin = student.login;
			req.session.typ = student.typ;
			req.session.login = true;
			res.render('login');
		} else {
			db.Wykladowca.find({where: {login : req.body.login, pass: req.body.password}}).success(function(wykladowca){
				console.log(wykladowca);
				if(wykladowca != null){
					req.session.userLogin = wykladowca.login;
					req.session.typ = wykladowca.typ;
					req.session.login = true;
					res.render('login');
				} else {
					res.render('index');
				}
			});
		}
	});
};
exports.logout = function(req, res){
	req.session.login = false;
	res.redirect('/');
};