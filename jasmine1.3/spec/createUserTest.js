describe("User", function() {
  
  it("should have a first name", function(){
    expect(users[0].firstName).toBe("Trang");
  });
  
  it("should have a last name", function(){
	expect(users[0].lastName).toBe("Phan");
  });
  
  it("should have an email", function() {
	expect(users[0].email).toBe("ph3wl4g0n@gmail.com");
  });
  
  it("all ages should be over 16", function() {
	for (var i = 0; i < users.length; i++) {
		expect(users[i].age).toBeGreaterThan(16);
	}
  });
  
  it("all users should be verified", function() {
	for (var i = 0; i < users.length; i++) {
		expect(users[i].emailVerified).toBe("true");
	}
  });
  
  it("user names should be more than 4 chars", function() {
	for (var i = 0; i < users.length; i++) {
		expect(users[i].username.length).toBeGreaterThan(4);
	}
  });
  
});