Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
//function expression object
var User = function(userName, password, email, firstName, lastName, age){
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
	this.age = age;
    this.isActive = '';

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
        alert("User created.");
        window.location.replace("login.html");
                
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
};//end createUser

/*
** Updates user - uses Cloud Code
*/
User.prototype.udpateUser = function(id){
        var firstName =  $("#fName").val();
        var lastName =  $("#lName").val();
        var username =  $("#user").val();
        var email =  $("#email").val();
        var age =  Number($("#age").val());
        var phone =  $("#phone").val();
        var isActive = $("#isActive").attr('checked');
        var active = (isActive == 'checked')?true:false;
        
        Parse.Cloud.run('modifyUser', { id: id, firstName: firstName, lastName:lastName, username:username, email:email, age:age, isActive:active},  {
          success: function(status) {
            alert(status);
            window.location.href ="admin.html";
          },
          error: function(error) {
            console.log(error);
          }
        });
  
};//end UpdateUser

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
** Queries User in Parse for match by id
** Calls populateEditUserForm
*/
User.prototype.findUser = function(id){
    Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");

    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", id);
    query.first().then(function(object){
        // Do something with the returned Parse.Object values
        //create User object from queried object
        user = new User(object.get("username"), object.get("password"), object.get("email"), object.get("firstName"), object.get("lastName"), object.get("age"));
        user.id = object.id; //assign id to User object
        user.isActive = object.get("isActive");

        user.populateEditUserForm();//call method that populates form
        });

};

/*
** Populates editUser.html (or any form with these fields) with User properties
*/
User.prototype.populateEditUserForm = function(){
    console.log(this.isActive);
    $("#fName").val(this.firstName);
    $("#lName").val(this.lastName);
    $("#user").val(this.userName);
    $("#password").hide();
	$("#age").val(this.age);
    $("#email").val(this.email);
    $("#isActive").val(this.isActive);
    if(this.isActive == true){
        $("#isActive").prop('checked',true);
    } 
    //$('input:radio[name=isActive]').prop('checked', true); 
    //$('input:radio[name=isActive]').prop('unchecked', false); 
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




//TODO - not working yet
User.prototype.createRole = function() {
      var roleACL = new Parse.ACL();
      roleACL.setWriteAccess(Parse.User.current(), true);
      roleACL.setPublicReadAccess(true);
      var role = new Parse.Role("Administrator", roleACL);
      role.getUsers().add(Parse.User.current());

      role.save(null, {
          success: function(saveObject) {
              // The object was saved successfully.
              alert('role creation done');
              updateRoleACL(saveObject);
           },
           error: function(saveObject, error) {
              // The save failed.
              window.alert("Failed creating role with error: " + error.code + ":"+ error.message);
              //assignRoles();
           }
      });
    };
//TODO - not working yet
User.prototype.updateRoleACL = function(role) {
      var roleACL = role.getACL();
      roleACL.setWriteAccess(Parse.User.current(), false);
      roleACL.setRoleWriteAccess(role,true); 
      role.save(null, {
          success: function(saveObject) {
              // The object was saved successfully.
              alert('role acl updated');
              getUser(); 
           },
           error: function(saveObject, error) {
              // The save failed.
              window.alert("Failed updating role with error: " + error.code + ":"+ error.message);
           }        
      })
    };
    