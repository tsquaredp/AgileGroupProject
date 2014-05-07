describe("Ride", function() {


	it("All rides should have a origin", function() {
		for (var i = 0; i < rides.length; i++) {
			expect(rides[i].origin).toBeDefined();
		}
	});

	it("All rides should have a destination", function() {
		for (var i = 0; i < rides.length; i++) {
			expect(rides[i].destination).toBeDefined();
		}
	});
	
	it("All rides should have seatsAvailable", function() {
		for (var i = 0; i < rides.length; i++) {
			expect(rides[i].seatsAvailable).toBeGreaterThan(0);
		}
	});
	
	it("All rides should have a price", function() {
		for (var i = 0; i < rides.length; i++) {
			expect(rides[i].price).toBeGreaterThan(0);
		}
	});
  
});