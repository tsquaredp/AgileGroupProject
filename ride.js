Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
                       
var Ride =function(origin, destination, seatsAvailable, date, time, price, smoke, drink, food){  
    this.origin = origin;
    this.destination = destination;
	this.seatsAvailable = seatsAvailable;
    this.date = date;
    this.time = time;
    this.price = price;
	this.smoke = smoke;
	this.drink = drink;
	this.food = food;
};

    
Ride.prototype.insertRide = function (){
	Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
	var ParseRide = Parse.Object.extend("Ride");//create subclass of Parse.Object
	var ride = new ParseRide();//new instance of that object (Ride) called ride
	 
	ride.set("origin",this.origin);
	ride.set("destination",this.destination);
	ride.set("seatsAvailable", this.seatsAvailable);
	ride.set("date",this.date);
	ride.set("time",this.time);
	ride.set("price",this.price);
	ride.set("smoke",this.smoke);
	ride.set("food",this.food);
	ride.set("drink",this.drink);
	ride.set("driverId", $.cookie("session"));

	ride.save(null , {
		success: function(ride){
			alert("ride "+ride.id+" saved.");
		},
		error: function(ride, error){
			alert("Failed to create "+ride.id+" because "+error.description);
		}
	});
};
   
Ride.prototype.getRide =function(id){
	Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
	var Ride = Parse.Object.extend("Ride");
	var query = new Parse.Query(Ride);
	query.get(id, {
	  success: function(ride) {
		origin = result.get("origin");
		destination = result.get("destination");
		seatsAvailable = result.get("seatsAvailable");
		time = result.get("time");
		date = result.get("date");
		price = result.get("price");
		smoke = result.get("smoke");
		food = result.get("food");
		drink = result.get("drink");
	  },
	  error: function(object, error) {
		// The object was not retrieved successfully.
		// error is a Parse.Error with an error code and description.
		alert("Error retrieving ride.");
	  }
	});
};
