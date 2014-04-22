/*
 var searchRides = $(function(){
                Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
*/                
                
var Ride = {  
    origin:this.origin,
    destination:this.destination,
    date:this.date,
    time:this.time,
    price:this.price,

    getOrigin: function (){
        return this.origin;
    },
    
    getDestination:function(){
        return this.destination;
    },
    getTime:function(){
        return this.time;
    },
    getDate:function(){
        return this.date;
    },
    getPrice:function(){
        return this.price;
    },
    setOrigin:function(origin){
        this.origin = origin;
    },
    setDestination:function(destination){
        this.destination = destination;
    },
    setTime:function(time){
        this.time = time;
    },
    setDate:function(date){
        this.date= date;
    },
    setPrice:function(price){
        this.price = price;
    },
    
    insertRide:function (){
        Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
        var ParseRide = Parse.Object.extend("Ride");//create subclass of Parse.Object
        var ride = new ParseRide();//new instance of that object (Ride) callled ride
         
        ride.set("origin",this.origin);
        ride.set("destination",this.destination);
        ride.set("date",this.date);
        ride.set("time",this.time);
        ride.set("price",this.price);

        ride.save(null , {
            success: function(ride){
                alert("ride "+ride.id+" saved.");
            },
            error: function(ride, error){
                alert("Failed to create "+ride.id+" because "+error.description);
            }
        });
    },
   
    getRide: function(id){
        Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
        var Ride = Parse.Object.extend("Ride");
        var query = new Parse.Query(Ride);
        query.get(id, {
          success: function(ride) {
            // The object was retrieved successfully.
            return ride;
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            alert("Error retrieving ride.");
          }
        });
    }
    
    
};






/*    
    
    
                
        var Ride = Parse.Object.extend("Ride");//create Ride class, subclass of Parse.Object
        var query = new Parse.Query(Ride);//create instance of Ride Class, called query
        
        if(origin != ''){query.equalTo("origin",origin);}
        if(destination != ''){query.equalTo("destination",destination);}
        if(date != ''){query.equalTo("date", date);}

        query.find({
          success: function(results) {
            var rideArray = new Array();
            // The object was retrieved successfully.

            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              alert(object.id + ' - ' + object.get('destination'));
              rideArray.push(object.id);
            }
          window.location = "rideSearchResults.html?"+rideArray;
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            alert("error");
          }
        });
                
                
};

*/