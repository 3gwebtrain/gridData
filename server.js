var 
express = require("express"),
app     = express(),
Router  = express.Router;

/* one time binding stuff */
var oneTimeRouter = new Router();

app.use(express.static(__dirname + "/public/"));

oneTimeRouter.get("/", function( req, res ) {

	res.sendFile( __dirname + "/public/oneTime/index.html");

});

app.use("/oneTime", oneTimeRouter);

/* track by stuff goes here */

var trackByRouter = new Router();

app.use(express.static(__dirname + "/public/"));

trackByRouter.get("/", function( req, res ) {

	res.sendFile( __dirname + "/public/trackBy/index.html");

});

app.use("/trackBy", trackByRouter);


/* track by stuff goes here */

var gridData = new Router();

app.use(express.static(__dirname + "/public/"));

gridData.get("/", function( req, res ) {

	res.sendFile( __dirname + "/public/gridData/index.html");

});

app.use("/gridData", gridData);


app.listen( 9000, function portCallback() {

	console.log(" I am started!!" , __dirname);

})