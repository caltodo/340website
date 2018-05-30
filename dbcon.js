var mysql = require('mysql');
var pool = mysql.createPool({
        connectionLimit : 10,
	  host            : 'classmysql.engr.oregonstate.edu',
	  user            : 'cs340_todorovc',
	  password        : '3758',
	  database        : 'cs340_todorovc'
});

module.exports.pool = pool;
