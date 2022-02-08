//Requiring mongoose package
var mongoose=require("mongoose");

// Schema
var rosterSchema=new mongoose.Schema({
	_id : String, //"Kalana_10334920220207", 
	date : String, //"2022-02-07"
	divisionQueue : String,//"HBB"
	staffId : String,//"Kalana_103349"
	shift : String, //"SFT"
	hrs : Number , //12,"L3" : 0, "L4" : 0, "L5" : 0, "
	starttime : String, //ISODate("2022-02-07T08:00:00Z"), 
	endtime : String, //ISODate("2022-02-07T20:00:00Z"), "
	handledCount : Number,//35, "
	assignedCount : Number,//0, 
	agentstatus : String,//"A", "
	eventTime : Date//ISODate("2022-02-07T08:49:24.973Z")
});

//module.exports=mongoose.model("Form",formSchema);
module.exports=mongoose.model("Form",rosterSchema);
