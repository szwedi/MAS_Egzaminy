var db = {};

if (!db.hasOwnProperty('seq')){
	var Sequelize = require('sequelize');
	var sequ = new Sequelize('masegzaminy','pjwstk','pjwstk311',{
		host : 'ec2-23-21-211-172.compute-1.amazonaws.com'
	});
}

db = {
	Sequelize : Sequelize,
	seq : sequ,
	Student : sequ.import(__dirname+'/student')
};

module.exports = db;