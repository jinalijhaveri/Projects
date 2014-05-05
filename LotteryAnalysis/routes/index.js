
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
	 
	  getduos();
	 
	  gettrios();
	 
}

var getTotalCount = function(req , res){
  var query = "SELECT count(*) as count FROM winning_nums";	
  var pool = conn.getPoolInstance();
  pool.getConnection(function(err , connection){
	  connection.query(query , function(err , rows){
		 if(!err){
			 totalCount_draws = rows[0].count ;
			 console.log("totalCount_draws  " + totalCount_draws);
		 } 
	  })
  })
}

var getduos = function(req , res){
	//var query = "select * from winning_nums order by drawId desc limit 100";
	var query = "select * from winning_nums";
	var pool = conn.getPoolInstance();
	pool.getConnection(function(err, connection) {

		connection.query(query,function(err,rows){
			console.log("length"+ rows.length);
		      for(var i = 0 ;  i < rows.length ; i++){
		    			    	
		    	    var key1 = "("+rows[i].num1+","+rows[i].num2+")";;
		    		console.log(key1);	  
		    		var key2 = "("+rows[i].num1+","+rows[i].num3+")";
		    				    		
		    		var key3 = "("+rows[i].num1+","+rows[i].num4+")";
		    		  		
		    		var key4 = "("+rows[i].num1+","+rows[i].num5+")";;
		    		
		    		var key5 = "("+rows[i].num2+","+rows[i].num3+")";;
		    		
		    		var key6 = "("+rows[i].num2+","+rows[i].num4+")";;
		    		
		    		var key7 = "("+rows[i].num2+","+rows[i].num5+")";;
		    		
		    		var key8 = "("+rows[i].num3+","+rows[i].num4+")";;
		    		
		    		var key9 = "("+rows[i].num3+","+rows[i].num5+")";;
		    		
		    		var key10 = "("+rows[i].num4+","+rows[i].num5+")";;
		    		
		    //		console.log(key10);
		    //		console.log(value10);
		    		
		    		if(dict.has(key1)){
		    			console.log("dict has");
		    			var value = dict.get(key1);
		    			//dict.remove(key1);
		    			//value = value+1
		    			dict.set(key1 , value+1)
		    			console.log("new value"+dict.get(key1));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key1,1)
		    		}
		    		
		    		if(dict.has(key2)){
		    			console.log("dict has");
		    			var value = dict.get(key2);
		    			//dict.remove(key2);
		    			dict.set(key2 , value+1)
		    			console.log("new value"+dict.get(key2));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key2,1)
		    		}
		    		
		    		if(dict.has(key3)){
		    			console.log("dict has");
		    			var value = dict.get(key3);
		    			//dict.remove(key3);
		    			dict.set(key3 , value+1)
		    			console.log("new value"+dict.get(key3));
		    		}else{
		    			dict.set(key3,1)
		    			console.log("seting new");
		    		}
		    		
		    		if(dict.has(key4)){
		    			console.log("dict has");
		    			var value = dict.get(key4);
		    			//dict.remove(key4);
		    			dict.set(key4 , value+1)
		    			console.log("new value"+dict.get(key4));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key4,1)
		    		}
		    		
		    		if(dict.has(key5)){
		    			console.log("dict has");
		    			var value = dict.get(key5);
		    			//dict.remove(key5);
		    			dict.set(key5 , value+1)
		    			console.log("new value"+dict.get(key5));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key5,1)
		    		}
		    		
		    		if(dict.has(key6)){
		    			console.log("dict has");
		    			var value = dict.get(key6);
		    			//dict.remove(key6);
		    			dict.set(key6 , value+1)
		    			console.log("new value"+dict.get(key6));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key6,1)
		    		}
		    		
		    		if(dict.has(key7)){
		    			console.log("dict has");
		    			var value = dict.get(key7);
		    			//dict.remove(key7);
		    			dict.set(key7 , value+1)
		    			console.log("new value"+dict.get(key7));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key7,1)
		    		}
		    		
		    		if(dict.has(key8)){
		    			console.log("dict has");
		    			var value = dict.get(key8);
		    			//dict.remove(key8);
		    			dict.set(key8 , value+1)
		    			console.log("new value"+dict.get(key8));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key8,1)
		    		}
		    		
		    		if(dict.has(key9)){
		    			console.log("dict has");
		    			var value = dict.get(key9);
		    			//dict.remove(key9);
		    			dict.set(key9 , value+1)
		    			console.log("new value"+dict.get(key9));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key9,1)
		    		}
		    		
		    		if(dict.has(key10)){
		    			console.log("dict has");
		    			var value = dict.get(key10);
		    			//dict.remove(key10);
		    			dict.set(key10 , value+1)
		    			console.log("new value"+dict.get(key10));
		    		}else{
		    			console.log("seting new");
		    			dict.set(key10,1)
		    		}
		    		
		      }
		    
		      dict.forEach(function(key,value){
		    	  console.log("key: "+key + "   " + "value: " + value);
		      })
		      
		     // console.log("size of dict2 " + dict2.size());
			  console.log("size of dict" + dict.size());
			   insertDuos();
		      connection.release();
			
		});
		
		
		
	});
	
	
}

var insertDuos = function(req , res){
	var pool = conn.getPoolInstance();
	pool.getConnection(function(err, connection){
		var query = "insert into duos (num1 , num2 , count , percentage) values ";
		
		dict.forEach(function(key,value){
	    	 // console.log("key: "+key + "   " + "value: " + value);
	    	var data = key.split(",");
	    	var num1 = data[0].slice(1);
	    	var num2_length = data[1].length;
	    	var num2 = data[1].substring(0,num2_length - 1);
			
			//console.log("num1 " + num1 + " num2 " + num2 );
	    	var percentage = (value/totalCount_draws)*100;
		   query += "("+num1+" , "+ num2+", "+ value+","+ percentage+"),";
	  			
	  			
	      })
	      //console.log(query);
	      var query_length = query.length;
		  query = query.substring(0 , query_length - 1)
	      connection.query(query , function(err , row){
	    	  console.log(query);	
	    	  if(!err){
	  					console.log("data inserted")
	  				}else{
	  					console.log("error in inserting data");
	  				}
	  				connection.release();
	  					
	  			})
		
	})
}

var gettrios = function(){
	
	//var query = "select * from winning_nums order by drawId desc limit 100";;
	var query = "select * from winning_nums";;
	var pool = conn.getPoolInstance();
	pool.getConnection(function(err, connection) {

		connection.query(query,function(err,rows){
			console.log("length"+ rows.length);
		      for(var i = 0 ;  i < rows.length ; i++){
		    			    	
		    	    var key1 = "("+rows[i].num1+","+rows[i].num2+","+rows[i].num3+")";;
		    	 
		    		var key2 = "("+rows[i].num1+","+rows[i].num3+","+rows[i].num4+")";
		    				    		
		    		var key3 = "("+rows[i].num1+","+rows[i].num4+","+rows[i].num5+")";
		    		  		
		    		var key4 = "("+rows[i].num1+","+rows[i].num3+","+rows[i].num4+")";;
		    		
		    		var key5 = "("+rows[i].num1+","+rows[i].num3+","+rows[i].num5+")";;
		    		
		    		var key6 = "("+rows[i].num1+","+rows[i].num4+","+rows[i].num5+")";;
		    		
		    		var key7 = "("+rows[i].num2+","+rows[i].num3+","+rows[i].num4+")";;
		    		
		    		var key8 = "("+rows[i].num2+","+rows[i].num3+","+rows[i].num5+")";;
		    		
		    		var key9 = "("+rows[i].num2+","+rows[i].num4+","+rows[i].num5+")";;
		    		
		    		var key10 = "("+rows[i].num3+","+rows[i].num4+","+rows[i].num5+")";;
		    		
		    //		console.log(key10);
		    //		console.log(value10);
		    		
		    		if(dict_trios.has(key1)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key1);
		    			//dict.remove(key1);
		    			//value = value+1
		    			dict_trios.set(key1 , value+1)
		    			console.log("new value"+dict_trios.get(key1));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key1,1)
		    		}
		    		
		    		if(dict_trios.has(key2)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key2);
		    			//dict.remove(key2);
		    			dict_trios.set(key2 , value+1)
		    			console.log("new value"+dict_trios.get(key2));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key2,1)
		    		}
		    		
		    		if(dict_trios.has(key3)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key3);
		    			//dict.remove(key3);
		    			dict_trios.set(key3 , value+1)
		    			console.log("new value"+dict_trios.get(key3));
		    		}else{
		    			dict_trios.set(key3,1)
		    			console.log("seting new");
		    		}
		    		
		    		if(dict_trios.has(key4)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key4);
		    			//dict.remove(key4);
		    			dict_trios.set(key4 , value+1)
		    			console.log("new value"+dict_trios.get(key4));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key4,1)
		    		}
		    		
		    		if(dict_trios.has(key5)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key5);
		    			//dict.remove(key5);
		    			dict_trios.set(key5 , value+1)
		    			console.log("new value"+dict_trios.get(key5));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key5,1)
		    		}
		    		
		    		if(dict_trios.has(key6)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key6);
		    			//dict.remove(key6);
		    			dict_trios.set(key6 , value+1)
		    			console.log("new value"+dict_trios.get(key6));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key6,1)
		    		}
		    		
		    		if(dict_trios.has(key7)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key7);
		    			//dict.remove(key7);
		    			dict_trios.set(key7 , value+1)
		    			console.log("new value"+dict_trios.get(key7));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key7,1)
		    		}
		    		
		    		if(dict_trios.has(key8)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key8);
		    			//dict.remove(key8);
		    			dict_trios.set(key8 , value+1)
		    			console.log("new value"+dict_trios.get(key8));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key8,1)
		    		}
		    		
		    		if(dict_trios.has(key9)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key9);
		    			//dict.remove(key9);
		    			dict_trios.set(key9 , value+1)
		    			console.log("new value"+dict_trios.get(key9));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key9,1)
		    		}
		    		
		    		if(dict_trios.has(key10)){
		    			console.log("dict has");
		    			var value = dict_trios.get(key10);
		    			//dict.remove(key10);
		    			dict_trios.set(key10 , value+1)
		    			console.log("new value"+dict_trios.get(key10));
		    		}else{
		    			console.log("seting new");
		    			dict_trios.set(key10,1)
		    		}
		    		
		      }
		    
		      dict_trios.forEach(function(key,value){
		    	  console.log("key: "+key + "   " + "value: " + value);
		      })
		      
		     // console.log("size of dict2 " + dict2.size());
			  console.log("size of dict" + dict_trios.size());
			   insertTrios();
		      connection.release();
			
		});
		
		
		
	});
	////////////////////
}

var insertTrios = function(req , res){
	var pool = conn.getPoolInstance();
	pool.getConnection(function(err, connection){
		
		dict_trios.forEach(function(key,value){
	    	 // console.log("key: "+key + "   " + "value: " + value);
			console.log("totalCount_draws  " + totalCount_draws);
			  var percentage = (value/totalCount_draws)*100;
	    	  var query = "insert into trios (tupple , count , percentage) values ('"+ key+"' , "+ value+" , "+ percentage+")";
	  			
	  			connection.query(query , function(err , row){
	  				if(!err){
	  					console.log("data inserted")
	  				}else{
	  					console.log(query)
	  					console.log("error in inserting data");
	  				}
	  				connection.release();
	  					
	  			})
	      })
		
	})
}



