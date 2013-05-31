var db = {};

if (!db.hasOwnProperty('seq')){
	var Sequelize = require('sequelize');
	var myseq = new Sequelize('masegzaminy','pjwstk','pjwstk311',{
		host : 'ec2-23-21-211-172.compute-1.amazonaws.com'
	});
}

db = {
	Sequelize : Sequelize,
	seq : myseq,
	Student : myseq.import(__dirname+'/student'),
	Wykladowca : myseq.import(__dirname+'/wykladowca')
};

module.exports = db;