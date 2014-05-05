Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
//function expression object
var Role = function(){


};


// By specifying no write privileges for the ACL, we can ensure the role cannot be altered.
Role.prototype.createRole = function(role){
    var roleACL = new Parse.ACL();
    //roleACL.setRoleWriteAccess(role,true);
    roleACL.setPublicReadAccess(true);
    var role = new Parse.Role(role, roleACL);
    role.save();
};

Role.prototype.updateRoleACL = function(roleName) {
    var role = new Parse.Role(roleName);
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




//no?
Role.prototype.addUsersToRole = function(roleName,roleACL){

    var role = new Parse.Role(roleName, roleACL);
    
    var currentUser = Parse.User.current();

    role.getUsers().add(currentUser);


    role.getRoles().add("Administrator");

    role.save();
};