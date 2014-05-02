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
		// - The object ID of the person receiving the request
		// - The object ID of the ride
		msg.set("SenderObjectId",$.cookie("session"));
		msg.set("RecipentObjectId", driverID);
		msg.set("RideObjectId",getUrlParameter());

		// check to see if the sender matchers the receiver to prevent
		// a user from sending a request to themselves
		if ($.cookie("session") != driverID) {
			msg.save(null , {
			  success: function(msg) {
				alert("Request Sent.");
			  },
			  error: function(msg, error){
				alert("Failed to send request");
			  }
			});
		} else {
			alert("You cannot add yourself to your own ride.");
		}
	},
	error: function(object, error) {
		// something went wrong and we couldn't get the driver ID
		alert("Could not get the driver ID");
	}
	});

};

UserMsg.prototype.displayMessagesInInbox = function () {
	
	// here, we want to get all the messages whose RecipentObjectId = the logged in user.
	var newMessages = Parse.Object.extend("UserMsg");
	var query = new Parse.Query(newMessages);
	
	query.equalTo("RecipentObjectId", $.cookie("session"));
	query.find({
		success: function(results) {
			alert("You have " + results.length + " Unhandled Ride Requests.");
			// print the messages using a loop
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				
				// find the User's name that matches the SenderObjectId
				var user = new Parse.Object.extend("User");
				var query2 = new Parse.Query(user);
				
				query2.get(object.get("SenderObjectId"), {
					success: function(userResult) {
						// got the User object whose name matches the id!
						// Now we have to query to get the ride information...
						var ride = Parse.Object.extend("Ride");
						var query3 = new Parse.Query(ride);
						
						query3.get(object.get("RideObjectId"), {
							success: function(rideResult) {
								// got the Ride object whose name matches the id!
								// *finally* time to output the message...
								$('#wrapper').append("<b>"+userResult.get("firstName")+" "+userResult.get("lastName")+"</b> wants to join the ride To: <b>"+rideResult.get("origin")+" - From: "+rideResult.get("destination")+".</b> <a href=inbox.html>Accept</a> <a href=inbox.html>Delete</a> <br>");
							},
							error: function (object, error) {
								alert("There was an error retrieving the ride object");
								// Ride object was not retrieved successfully.
							}	
						});	
					},
					error: function(object, error) {
						// User object was not retrieved successfully.
					}
				});
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
};