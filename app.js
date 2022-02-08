//importing dependencies
const express = require("express")
const app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var fs = require('fs');


var agentDetail;
fs.readFile('agent_details.json', 'utf8', function (err, data) {
  if (err) throw err;
  agentDetail = JSON.parse(data);
});

// Calling form.js from models
var Form=require("./models/form");
const { stringify } = require("querystring");

// Connecting to database
mongoose.connect("mongodb://localhost/crcroster",{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.listen(8082)
//middlewares
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(__dirname + '/public'));

//rendering form.ejs
app.get("/login",function(req,res){
	res.render("form");
});

// form submission
app.get('/result',(req,res)=>{
	res.render('result');
});

app.get('/error',(req,res)=>{
	res.render('error');
});

//creating form
app.post("/login",function(req,res){
	/*var username=req.body.username;
	var email=req.body.email;
	*/
    console.log(req.body.date+'T'+req.body.starttime+':00.947Z');
    console.log(Date.now());
	var date = req.body.date; //"2022-02-07"   //new Date(req.body.date).toISOString()
	var staffId = req.body.staffId;//"Kalana_103349"
	var shift = req.body.shift; //"SFT"
    var starttime = req.body.date+'T'+req.body.starttime+':00.947Z';//parseInt(req.body.starttime.substring(0,2));
    var endtime = req.body.date+'T'+req.body.starttime+':00.947Z';//parseInt(req.body.endtime.substring(0,2));
    var handledCount = 0;//req.body.handledCount;//35, "
	var assignedCount = 0;//req.body.assignedCount;//0, 
	var agentstatus = "A";//req.body.agentstatus;//"A", "
	var eventTime = new Date(Date.now()).toISOString()//req.body.eventTime;//ISODate("2022-02-07T08:49:24.973Z")
    var id = staffId//date.toISOString().slice(0,10).replace(/-/g,"");//req.body.id; //"Kalana_10334920220207", 
	var hrs = parseInt(req.body.endtime.substring(0,2))-parseInt(req.body.starttime.substring(0,2)); //req.body.hrs; //12,"L3" : 0, "L4" : 0, "L5" : 0, "
    var division = req.body.division;//"HBB"
    var divisionQueue = agentDetail[division][staffId];//"HBB"

	var f={_id:id, date:date, divisionQueue:divisionQueue, staffId:staffId, shift:shift, hrs:hrs, starttime:starttime, endtime:endtime ,handledCount:handledCount,assignedCount:assignedCount,agentstatus:agentstatus,eventTime:eventTime}
	console.log(stringify(f))
	//var f={username: username,email:email};
	Form.create(f,function(err,newlyCreatedForm){
		if(err)
		{
			console.log(err);
            res.redirect("/error");
		}else{
			res.redirect("/result");
		}
	});
});
 