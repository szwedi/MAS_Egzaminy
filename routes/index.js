
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.loginPanel = function(req, res){
  res.render('loginPanel');
};

exports.login = function(req, res){
  res.render('login');
};