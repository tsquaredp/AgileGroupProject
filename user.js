Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
//function expression object
var User = function(userName, password, email, firstName, lastName){
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    
};

//methods declared outside object block using prototype
User.prototype.fullName = function(){
    return(this.firstName+" "+this.lastName);
};


User.prototype.createUser = function(){
    
    var user = new Parse.User();
    user.set("username", this.userName);
    user.set("password", this.password);
    user.set("email", this.email);
    user.set("firstName", this.firstName);
    user.set("lastName", this.lastName);
     
    user.signUp(null, {
      success: function(user) {
        alert("User created");
        window.location.replace("login.html");
                
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
};//end createUser

User.prototype.login = function(){
    Parse.User.logIn(this.userName, this.password, {
        success: function(user) {
            // Do stuff after successful login.
            alert("success");
            window.location.replace("search.html");
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
            alert("Error: " + error.code + " " + error.message);
        }
    });
};//end login

User.prototype.deleteUser = function(id){
    var query = new Parse.User;
    query.equalTo("id", id);
    query.find().then(function(results){
        return results.destroy();
    });
  

};


User.prototype.findUser = function(){
    Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
    var userList = new Array();
    var query = new Parse.Query(Parse.Object.extend("UserDB"));
    query.equalTo("fName", "John");
    var findEm = function(userList){
        query.find({
          success: function(results, userList) {
            //alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              //alert(object.id + ' - ' + object.get('playerName'));
              userList[i] = new User();
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
    findEm();
    return userList;
    
};

User.prototype.getUsers = function(){

        var users = new Array();

        var query = new Parse.Query(Parse.User);
   
        query.find().then(function(obj){
            //console.log(obj.length);
                for (var i = 0; i < obj.length; i++) { 
                    var object = obj[i];
                    //console.log(object.id);
                    user = new User(object.get("username"), object.get("password"), object.get("email"), object.get("firstName"), object.get("lastName"))
                    user.id = object.id;
                    users[i] = user;
                }
                console.log(users);
                return users
        }).then(function(input){
            for(var i = 0; i < input.length; i++){
                var display =("<tr><td>User: "+input[i].firstName+" "+input[i].lastName +" </td>");
                var display = display.concat("<td>Username: "+input[i].userName+"</td><td><input type='button' class='deleteUser' id='"+input[i].id+"' value='Delete'></td></tr>");
                $("#users").append(display);

            }
            
            $(document).ready(function(){
            $(".deleteUser").click(function(){
                var id = $(this).attr('id');
                console.log(id);
                window.location.replace("editUser.html?id="+id);
                });
            });
            
        });
        
        
};
    