
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  wykladowca = require('./routes/wykladowca'),
  http = require('http'),
  path = require('path'),
  db = require('./models_mysql/settings'),
  mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://pjwstk:pjwstk311@linus.mongohq.com:10037/eX4AJDngsak3Mk6bLAEsg');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'secret key'}));
app.use(function(req, res, next){
	res.locals.session = req.session;
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/loginPanel', routes.loginPanel);
app.post('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/classPanel', wykladowca.classPanel);
app.post('/classPanel', wykladowca.classPanelPost);
app.get('/createClass', wykladowca.createClass);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
