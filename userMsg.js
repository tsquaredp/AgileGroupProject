Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");

var UserMsg = function(id, SenderObjectId, RecipentObjectId, RideObjectId){  
  this.id = id; 
  this.SenderObjectId = SenderObjectId;
  this.RecipentObjectId = RecipentObjectId;
  this.RideObjectId = RideObjectId;
}; 
 
UserMsg.prototype.sendNewMessageRequest = function (){

	var ParseMsg = Parse.Object.extend("UserMsg");//create subclass of Parse.Object
	var msg = new ParseMsg; // new instance of that object (UserMsg) called msg

	// get the value of the ride's author from the ride in the URL parameter
	var ride = Parse.Object.extend("Ride");
	var query = new Parse.Query(ride);
	
	var driverID = "";

	query.get(getUrlParameter(), {
	success: function(ride) {
		// we successfully got the driver ID for the ride
		driverID = ride.get("driverId");
		
		// we're going to need 3 values:
		// - The object ID of the person sending the request
		// - The object ID of the person recieving the request
		// - The object ID of the ride
		msg.set("SenderObjectId",$.cookie("session"));
		msg.set("RecipentObjectId", driverID);
		msg.set("RideObjectId",getUrlParameter());

		msg.save(null , {
		  success: function(msg) {
			alert("Request Sent.");
		  },
		  error: function(msg, error){
			alert("Failed to send request");
		  }
		});
	},
	error: function(object, error) {
		// something went wrong and we couldn't get the driver ID
		alert("Could not get the driver ID");
	}
	});

};
