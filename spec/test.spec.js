describe('Poker should work', function(){

	var poker;

	beforeEach(function() {
		poker = new Poker();
	});

	it('should return highest card as score', function(){
		var hand = [[2, 'C'], [3, 'D'], [5, 'H']];
		expect(poker.getHighestCard(hand)[0]).toBe(5);
		expect(poker.getHighestCard(hand)[1]).toBe('H');
	});

	it('should check for pair and return the pair score', function() {
		var hand = [[2, 'C'], [3, 'D'], [3, 'H']];
		expect(poker.checkForPair(hand)).toBe(6); // returns pair score
	});

	it('should check for two pairs and return the pairs score', function() {
		var hand = [[2, 'C'], [3, 'D'], [3, 'H'], [2, 'S']];
		expect(poker.checkForTwoPair(hand)).toEqual([6, 4]); // returns pair score
	});

	it("should check for triple and returns a score", function() {
		var hand = [[3, 'C'], [3, 'D'], [3, 'H'], [2, 'S']];
		expect(poker.checkForTriple(hand)).toEqual(9);
	});

	it("should check for straight and returns a score", function() {
		var hand = [[2, 'C'], [3, 'D'], [4, 'H'], [5, 'S'], [6, 'D']];
		expect(poker.checkForStraight(hand)).toBe(20);

		var hand = [[2, 'C'], [3, 'D'], [4, 'H'], [5, 'S'], [10, 'D']];
		expect(poker.checkForStraight(hand)).toBe(0);
	});

	it("should check for flush and returns a score", function() {
		var hand = [[2, 'C'], [3, 'C'], [4, 'C'], [5, 'C'], [6, 'C']];
		expect(poker.checkForFlush(hand)).toBe(6);

		var hand = [[2, 'C'], [3, 'D'], [4, 'H'], [5, 'S'], [10, 'D']];
		expect(poker.checkForFlush(hand)).toBe(0);
	});

	it("should check for full house and returns a score", function() {
		var hand = [[2, 'C'], [2, 'H'], [3, 'C'], [3, 'H'], [3, 'D']];
		expect(poker.checkForFullHouse(hand)).toBe(3);

		var hand = [[2, 'C'], [2, 'D'], [2, 'H'], [2, 'S'], [10, 'D']];
		expect(poker.checkForFullHouse(hand)).toBe(0);
	});

	it("should check for four of a kind and returns a score", function() {
		var hand = [[2, 'C'], [2, 'D'], [2, 'H'], [2, 'S'], [10, 'D']];
		expect(poker.checkForFourOfAKind(hand)).toBe(8);

		var hand = [[2, 'C'], [2, 'D'], [2, 'H'], [3, 'S'], [10, 'D']];
		expect(poker.checkForFourOfAKind(hand)).toBe(0);
	});

	it("should check for straight flush", function() {
		var hand = [[2, 'C'], [3, 'C'], [4, 'C'], [5, 'C'], [6, 'C']];
		expect(poker.checkForStraightFlush(hand)).toBe(6);
	});

	it("should compare highest cards", function() {
		var hand1 = [[2, 'C'], [3, 'D'], [5, 'H'], [10, 'H'], [12, 'D']];
		var hand2 = [[2, 'D'], [4, 'H'], [5, 'D'], [11, 'H'], [12, 'H']];

		expect(poker.compareHighestCards(hand1, hand2)).toEqual({
			hand: hand2,
			card: [11, 'H']
		});
	});

	xit("should compare highest pair", function() {
		var hand1 = [[3, 'C'], [3, 'D'], [5, 'H'], [11, 'H'], [12, 'D']];
		var hand2 = [[2, 'D'], [2, 'H'], [5, 'D'], [11, 'H'], [12, 'H']];

		expect(poker.compareHighestPair(hand1, hand2)).toEqual({
			hand: Poker.sortHand(hand1),
			pair: 3
		});
	});
});
