Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
                       
var Ride =function(origin, destination, seatsAvailable, date, price, smoke, drink, food){  
    this.origin = origin;
    this.destination = destination;
	this.seatsAvailable = seatsAvailable;
    this.date = date;
    this.time = '';
    this.price = price;
	this.smoke = smoke;
	this.drink = drink;
	this.food = food;
};

    
Ride.prototype.insertRide = function (){
	Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
	var ParseRide = Parse.Object.extend("Ride");//create subclass of Parse.Object
	var ride = new ParseRide();//new instance of that object (Ride) callled ride
	 console.log(this.origin);
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
            window.location.href="search.html";
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


Ride.prototype.displayMatchingRides = function(query){
    var data = query.split(','); 
    for (i = 0; (i < data.length); i++) {
        data[i] = unescape(data[i]);
        var Ride = Parse.Object.extend("Ride");
        var query = new Parse.Query(Ride);
        var info = query.get(data[i], {
            success: function(info){
                $('body').append('\
                    <section class="ride">\
                        <div class="route">\
                            <a href="ride.html?'+info.id+'" class="routeLink">\
                                <span class="origin">'+info.get("origin")+'-'+info.get("destination")+'</span>\
                                <p class="time">'+"Departs "+info.get("time")+'</p>\
                            </a>\
                        </div>\
                        <div class="seatCost">\
                            Per Seat:\
                            <p class="price">$'+info.get("price")+'</p>\
                        </div>\
                    </section>');
                    $('.date').text("Rides for "+info.get("date"));
                } //end query success function
        });
    }
};