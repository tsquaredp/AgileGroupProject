Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
//function expression object
var User = function(userName, password, email, firstName, lastName, age){
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
	this.age = age;
    
};

/*
** Returns User's full name
*/
User.prototype.fullName = function(){
    return(this.firstName+" "+this.lastName);
};//end fullname

/*
** Creates user 
*/

User.prototype.createUser = function(){
    
    var user = new Parse.User();
    user.set("username", this.userName);
    user.set("password", this.password);
    user.set("email", this.email);
    user.set("firstName", this.firstName);
    user.set("lastName", this.lastName);
	user.set("age", this.age);
     
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

/*
** Logs this.User in
*/
User.prototype.login = function(urlParam){
    Parse.User.logIn(this.userName, this.password, {
        success: function(user) {
            $.cookie("session",user.id);
            var fullName = user.get("firstName")+" "+user.get("lastName");
            $.cookie("fullName", fullName);
            // Do stuff after successful login.
            alert("success");
            if (urlParam == ""){
                window.location.replace("search.html");
            }else{
                window.location.replace("ride.html?"+urlParam);
            }
        },
        error: function(user, error) {
            // The login failed. Check error to see why.
            alert("Error: " + error.code + " " + error.message);
        }
    });
};//end login

/*
** Theoretically deletes User from Parse
** TODO
*/ 
User.prototype.deleteUser = function(id){
    var query = new Parse.User;
    query.equalTo("id", id);
    query.find().then(function(results){
        return results.destroy();
    });
  

};//end deleteUser

/*
** Queries User in Parse for match by id
*/

User.prototype.findUser = function(id){
    Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");

    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", id);
    query.first().then(function(object){
        // Do something with the returned Parse.Object values
        //console.log(object.get("firstName"));
        console.log(object);
        
        //create User object from queried object
        user = new User(object.get("username"), object.get("password"), object.get("email"), object.get("firstName"), object.get("lastName"), object.get("age"));
        user.id = object.id; //assign id to User object
       
        user.populateEditUserForm();//call method that populates form
        });

};

/*
** Populates editUser.html (or any form with these fields) with User properties
*/
User.prototype.populateEditUserForm = function(){
    alert("hi");
    $("#fName").val(this.firstName);
    $("#lName").val(this.lastName);
    $("#user").val(this.userName);
    $("#password").hide();
	$("#age").val(this.age);
    $("#email").val(this.email);
    $("#createUser").val("Edit User");
};//end populateEditUserForm

/*
** Gets all Users in db (from Users) and puts them in <table> -- does two things -- fix me!
*/

User.prototype.getUsers = function(){

        var users = new Array();

        var query = new Parse.Query(Parse.User);
   
        query.find().then(function(obj){
            //console.log(obj.length);
                for (var i = 0; i < obj.length; i++) { 
                    var object = obj[i];
                    //console.log(object.id);
                    user = new User(object.get("username"), object.get("password"), object.get("email"), object.get("firstName"), object.get("lastName"), object.get("age"));
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
                window.location.replace("editUser.html?"+id);
                });
            });
            
        });        
};//end getUsers
    