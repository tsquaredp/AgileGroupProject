describe("User - Create user from constructor", function() {

  beforeEach(function() {
    user = new User("jsmith","password","jim@mail.com","Jim", "Smith", 22 );
  });
 
  it("should have a full name", function() {
    expect(user.fullName()).toBe("Jim Smith");
    console.log(user.fullName);
  });
  
  it("should have a first name", function(){
    user.firstName = "Jim";
    expect(user.firstName).toBe("Jim");
  });
  
  it("should have a last name", function(){
	expect(user.lastName).toBe("Smith");
  });
  
  it("should have an email", function(){
	expect(user.email).toBe("jim@mail.com");
  });
  it("should have a password", function(){
	expect(user.password).toBe("password");
  });
  it("should have an age", function(){
	expect(user.age).toBe(22);
  });  
  it("should have a default role - user", function(){
	expect(user.role).toBe('user');
  }); 
  it("should not be an admin", function(){
	expect(user.role).not.toBe('admin');
  }); 
/*  
  it("should not be an admin", function(){
	expect(user.createUser()).not.toBe('user');
  }); 
*/  
  
});