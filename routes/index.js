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
			req.session.login = true;
			res.render('login');
		} else {
			res.render('index');
		}
	});
//	if(req.body.login === 's0001' && req.body.password === 'pjwstk311'){
//		req.session.userLogin = req.body.login;
//		req.session.login = true;
//		res.render('login');
//	} else {
//		res.render('index');
//	}
};

exports.logout = function(req, res){
	req.session.login = false;
	res.redirect('/');
};