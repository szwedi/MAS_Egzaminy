module.exports = function(sequalize, DataTypes) {
	return sequalize.define('Wykladowca',{
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		imie: DataTypes.STRING,
		nazwisko: DataTypes.STRING,
		login: DataTypes.STRING,
		pass: DataTypes.STRING,
		email: DataTypes.STRING,
		typ: DataTypes.STRING
	},
	{
		tableName: 'wykladowca',
		timestamps : false
	});
};