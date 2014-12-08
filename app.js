
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');

var helpers=require('./routes/helpers');
var expHandle = require('express-handlebars');

var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


var handleObj=expHandle.create({
	helpers:helpers
	});

app.engine("handlebars",handleObj.engine);
app.set('view engine',"handlebars");
// all environments
app.set('port', process.env.PORT || 3000);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',function(req,res){ res.render('index',{message:"Welcome sir!!!"})});


app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
