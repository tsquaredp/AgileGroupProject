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
      
      
      var ride = Ride;
      aRide = ride.getRide(getUrlParameter()); //ride from the db
      
      
      // we're going to need 3 values:
      // - The object ID of the person sending the request
      // - The object ID of the person recieving the request
      // - The object ID of the ride
      msg.set("SenderObjectId",$.cookie("session"));
      msg.set("RecipentObjectId", "TODO");
      msg.set("RideObjectId",getUrlParameter());
      
        msg.save(null , {
          success: function(msg) {
            alert("Request Sent.");
          },
          error: function(msg, error){
            alert("Failed to send request");
          }
        });

};
