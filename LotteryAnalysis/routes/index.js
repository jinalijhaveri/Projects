
/*
 * GET home page.
 */
var dbconn = require('../model/dbconnection');
var fs  = require("fs");
var http = require('http');
var CronJob = require('cron').CronJob;

new CronJob('0 0 0 * * 4,6', function(){
    console.log('This job will run on every wed-sat');
    readFile();
}, null, true,null);

exports.index = function(req, res){
	dbconn.getlastwinningnum(function(err,rows){
			console.log(rows.length);
			//readFile();
		  res.render('index', {win:rows });
	});
};

exports.getLowestNumFreq = function(req, res){
	dbconn.getFirstNumFrequency(function(err,rows){
			console.log(rows.length);
		  res.send(rows);
	});
	
};

exports.getHighestNumFreq = function(req,res){
    dbconn.getLastNumFrequency(function(err,rows){
			console.log(rows);
		  res.send(rows);
	});
};


function readFile(){	
	var file = fs.createWriteStream("lottery.txt");
	var request = http.get("http://www.calottery.com/sitecore/content/Miscellaneous/download-numbers/?GameName=superlotto-plus", function(response) {
			response.pipe(file);
			fs.readFile('lottery.txt', function(err,data){
				  var array = data.toString().split('\n');
				  var newRecord = array[5];
				  var numArray = newRecord.toString().split(/[\s]+/);
				  console.log(numArray);  
				  var drawDate = numArray[2] + " " +numArray[3] + numArray[4];
				  console.log(drawDate);
				  dbconn.insertNewData(numArray[0],numArray[5],numArray[6],numArray[7],numArray[8],numArray[9],numArray[10],drawDate,function(results){
					  console.log("Data insertes successfully");
					  console.log("Data processing started");
					  processData();
				  });
				 
			});
			
	});
}


function processData(){
	dbconn.insertNumFrequency(function(rows){	 
		  console.log("Calculated Num Frequency");
	  });
}




