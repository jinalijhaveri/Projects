
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,analysis = require('./routes/analysis')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , async = require('async');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.configure('development', function() {
  console.log('Using development settings.');
  app.set('connection', mysql.createConnection({
    host: '',
    user: '',
    port: '',
    password: ''}));
  app.use(express.errorHandler());
});

app.configure('production', function() {
  console.log('Using production settings.');
  app.set('connection', mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT}));
});


function init() {

app.get('/', routes.index);
app.get('/superLottoPlusPatterns' , analysis.patterns);
app.get('/analysis' , analysis.analysis );
app.get('/superPicks' , analysis.superPicks)

// Patterns Navigation

app.get('/mostFreqNum',analysis.getMostFreqNums);
app.get('/lowestNumFreq',routes.getLowestNumFreq);
app.get('/highestNumFreq',routes.getHighestNumFreq);
app.get('/avgDaysForWinNum',analysis.calcAvgWinDays);
app.get('/get_row_difference' , analysis.get_row_difference);
app.get('/duos' , analysis.duos ); // this is for megha's duo graph
app.get('/gettrios_table' , analysis.gettrios_table);
app.get('/showReatingnum',analysis.showReatingnum);
app.get('/showConsecutiveNum',analysis.showConsecutiveNum);
app.get('/oddEven',analysis.oddEven);




// User Input Analysis Operations
app.post('/get_numFreq_userInput' , analysis.get_numFreq_userInput ); 
app.post('/get_duos_userInput' , analysis.get_duos_userInput ); 
app.post('/userOddEven',analysis.userOddEven);
app.post('/userPattern',analysis.userPattern);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}
