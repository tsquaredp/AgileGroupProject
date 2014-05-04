describe("User", function() {

  beforeEach(function() {
    user = new User();
  });
 
  it("should have a full name", function() {
    user.firstName = "Testman";
    user.lastName = "Johnson";
    expect(user.fullName()).toBe("Testman Johnson");
    console.log(user.fullName);
  });
  
  it("should have a first name", function(){
    user.firstName = "Name";
    expect(user.firstName).toBe("Name");
  });
  
  it("should return a parse user"), function(){
    user.getUserFromParse("yG11N94EUH");
   // expect(user.firstName).toBe("Trang");
   // expect(user.lastName).toBe("Phang");
    expect(user.username).not.toBe("dad");
  }
  
});