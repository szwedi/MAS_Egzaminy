exports.index = function(req, res){
	res.render('index');
};

exports.loginPanel = function(req, res){
	res.render('loginPanel');
};

exports.login = function(req, res){
	if(req.body.login === 's0001' && req.body.password === 'pjwstk311'){
		req.session.userLogin = req.body.login;
		req.session.login = true;
		res.render('login');
	} else {
		res.render('index');
	}
};

exports.logout = function(req, res){
	req.session.login = false;
	res.redirect('/');
};