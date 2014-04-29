/**
 * New node file
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'welcome',
	port : '3306',
	database : 'lottery'
});

exports.getFirstNumFrequency = function(callback) {
	var query = "select count(num1) as cnt,num1 from winning_nums group by num1 ";
	connection.query(query, function(err, rows) {
		callback(err, rows);
	});
}

exports.insertNewData = function(drawId,num1, num2, num3, num4, num5, megaNum,drawDate,
		callback) {
	var query = "INSERT INTO winning_nums (drawId,num1,num2,num3,num4,num5,meganum,drawdate) VALUES ("+drawId+","
			+ num1
			+ ","
			+ num2
			+ ","
			+ num3
			+ ","
			+ num4
			+ ","
			+ num5
			+ ","
			+ megaNum + ",'"+drawDate+"');";
	console.log("Insert Query______" + query);
	connection.query(query, function(err, results) {
		if (err)
			console.log(err);
		else
			callback(results);
	});
}

exports.insertNumFrequency = function(callback) {
	
	// Find Frequency of each num
	var listFrequency;
	var query = "SELECT num1 as num, COUNT(*) as cnt FROM (SELECT num1 FROM winning_nums "
			+ "UNION ALL SELECT num2 FROM winning_nums UNION all "
			+ "SELECT num3 FROM winning_nums "
			+ "UNION all select num4 from winning_nums "
			+ "UNION all select num5 from winning_nums " + ") t GROUP BY num1";

		connection.query(query, function(err, results) {
			listFrequency = results;
		
		// Empty num_frequency table
		
		var truncateQuery = "TRUNCATE num_frequency;";
		connection.query(truncateQuery,function(err,results){
			
			if(err){
				console.log("Error occurred while truncating table");
			}
			else{
				var str = 'INSERT INTO num_frequency (num,frequency) VALUES ';
				for (var i = 0; i < listFrequency.length; i++) {
					str = str + "(" + listFrequency[i].num + "," + listFrequency[i].cnt + "),";
				}

				var insertQuery = str.substring(0, str.length - 1) + ';';
				console.log(insertQuery);
				
				
				// Insert counted frequency in num_frequency table
				connection.query(insertQuery, function(err, results) {
					callback(results);
				});
				
			}		
			
		});	
		
	});
}

exports.getMostFreqNums = function(callback) {
	var query = "select num,frequency from num_frequency";
	connection.query(query, function(err, results) {
		if (err) {
			console.log(err);
		} else {
			callback(err, results);
		}

	});
}


exports.getLastWinningNum = function(callback){
	var query = "SELECT * FROM winning_nums ORDER BY drawID DESC LIMIT 1";
	connection.query(query, function(err, results) {
		if (err) {
			console.log(err);
		} else {
			callback(err, results);
		}

	});
}

exports.getduos=function(callback){
	var query="select num1,num2,count from duos";
	connection.query(query,function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			callback(err,rows);
		}
	})
}

exports.getAllNums = function(callback){
	var query = "SELECT drawId,num1,num2,num3,num4,num5 FROM winning_nums ORDER BY drawID DESC LIMIT 100;"
		connection.query(query, function(err, results) {
			if (err) {
				console.log(err);
			} else {
				callback(results);
			}

		});		
}