describe("Ride", function() {
	
	beforeEach(function() {
		ride = new Ride();
		ride.getRide(eJDnpXGecr);
	});

	it("A ride should have a origin", function() {
		expect(ride.origin()).toBe("Eau Claire");
	});

	it("A ride should have a destination", function() {
		expect(ride.destination()).toBe("Denver");
	});
	
	it("A ride should have seatsAvailable", function() {
		expect(ride.seatsAvailable()).toBe(3);
	});
	
	it("A ride should have a time", function() {
		expect(ride.getTime()).toBe("3:00pm");
	});
	
	it("A ride should have a date", function() {
		expect(ride.date()).toBe("3/3/04");
	});
	
	it("A ride should have a price", function() {
		expect(ride.price()).toBe(50);
	});
  
});