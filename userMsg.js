var UserMsg = {  
  id:this.id,
  SenderObjectId:this.SenderObjectId,
  RecipentObjectId:this.RecipentObjectId,
  RideObjectId:this.RideObjectId,
  
    sendNewMessage:function (){
      Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
      var ParseMsg = Parse.Object.extend("UserMsg");//create subclass of Parse.Object
      var msg = new ParseMsg(); // new instance of that object (UserMsg) called msg
      
      // we're going to need 3 values:
      // - The object ID of the person sending the request
      // - The object ID of the person recieving the request
      // - The object ID of the ride
      msg.set("SenderObjectId",this.SenderObjectId);
      msg.set("RecipentObjectId",this.RecipentObjectId);
      msg.set("RideObjectId",this.RideObjectId);
      
        msg.save(null , {
          success: function(msg) {
            alert("Request Sent.");
          },
          error: function(msg, error){
            alert("Failed to send request");
          }
        });
      }
};