/*User object 
** object literals - module vs. typical:
** http://stackoverflow.com/questions/1600130/javascript-advantages-of-object-literal
** http://hippieitgeek.blogspot.se/2013/08/object-literal-namespace-oln-in.html
*/

var User = {
    id: undefined,
    userName: undefined,
    password: undefined,
    fName: undefined,
    lName: undefined,
//mutators    
    setId: function(id){
        this.id = id;
    },
    setUserName: function(userName){
        this.userName = userName;
    },
    setPassword: function(password){
        this.password = password;
    },
    setLastName: function(lName){
        this.lName = lName;
    },
    setFirstName: function(fName){
        this.fName = fName;
    },
//accessors    
    getId: function(){
        return this.id;
    },
    getUserName: function(userName){
        return this.userName;
    },
    getPassword: function(password){
        this.password;
    },
    getLastName: function(password){
        return this.lName;
    },
    getFirstName: function(fName){
        return this.fName;
    },
//methods    
    helloUser: function(message){
        return "Hello, "+message;
    },
    
    createUser: function(){
        Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
        var UserCreate = Parse.Object.extend("UserDB");//create subclass of Parse.Object
        var createUser = new UserCreate();//new instance of that object 
       
        createUser.set("userName", this.userName);
        createUser.set("password", this.password);
        createUser.set("fName", this.fName);
        createUser.set("lName", this.lName);
         
        createUser.save(null, {
            success: function(){
                alert("User created");
                window.location.replace("login.html");
                
            },
            error: function(){
                alert("Error creating user");
            }
        });
    
    },
    
    login: function(){
        Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");
        var UserLogin = Parse.Object.extend("UserDB");//create subclass of Parse.Object
        var query = new Parse.Query(UserLogin);
        query.equalTo("userName", this.userName);
        query.equalTo("password", this.password);
        query.first({
            success: function(results){
                if(results != null){
                    alert("Success,  "+results.get('fName')+"!");
                    // create a cookie that will track the user's session
                    $.cookie('session', results.id);
                    
                    var fName = results.get('fName');
                    var lName = results.get('lName');
                    var fullName = fName + " " + lName;
                    $.cookie('fullName', fullName);
                    
                    // DEBUG
                    // output the queried object's id
                    // to make sure we're retrieving it properly
                    // and that it's successfully stored into the cookie
                    // DEBUG
                    //alert(document.cookie);
                    //var testReadCookie = $.cookie('session');
                    //alert(testReadCookie);
                    
                    window.location.replace("search.html");
                }else{
                    alert("User or password not found.");
                    window.location.replace("login.html");
                }
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                alert("Error logging in. "+error);
            }
        });
    }

};