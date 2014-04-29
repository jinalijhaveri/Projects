
/*
 * GET home page.
 */
var dbconn = require('../model/dbconnection');
var fs  = require("fs");
var http = require('http');

exports.index = function(req, res){
		//readFile();
	 res.render('index');
	
};

exports.showGraph = function(req, res){
	dbconn.getFirstNumFrequency(function(err,rows){
		  res.send(rows);
	});	
};

exports.getMostFreqNums = function(req,res){
	dbconn.getMostFreqNums(function(err,rows){
		res.send(rows);
	});
};

exports.duos=function(req,res){
	dbconn.getduos(function(err,rows){
		if(!err){
			res.send(rows);
		}
	})
}

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


exports.calcAvgWinDays = function(req,res)
{
	dbconn.getAllNums(function(rows){
		console.log(rows);
		var dataMap = {};
		
		var key;
		var x;
		for(var i=0;i<rows.length;i++)
		{			
			dataMap = createRecord(dataMap,rows[i],rows[i].num1);
			dataMap = createRecord(dataMap,rows[i],rows[i].num2);
			dataMap = createRecord(dataMap,rows[i],rows[i].num3);
			dataMap = createRecord(dataMap,rows[i],rows[i].num4);
			dataMap = createRecord(dataMap,rows[i],rows[i].num5);
		}
		console.log(dataMap);
		res.send(dataMap);
	});	
}


function createRecord(dataMap,currRow,key){
	
	var record;
	record = dataMap[key];
	if(typeof record != "undefined"){
		record.cnt++
		var diff = parseInt(record.id) - parseInt(currRow.drawId) - 1;
		record.id = currRow.drawId;
		record.days =  parseInt(record.days) +  parseInt(diff);
	}
	else{
		
		dataMap[key] =  { key : key,days : 0,cnt : 0,id:currRow.drawId};
	}
	return dataMap;
}