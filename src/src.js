function Poker() {}

Poker.prototype.getHighestCard = function(hand, skipCards) {
	skipCards = skipCards || 0;
	Poker.sortHand(hand);

	return hand[0+skipCards];
};

Poker.sortHand = function(hand) {
	hand.sort(function(array1, array2) {

		if(array1[0] > array2[0]) {
			return -1;
		} else if(array1[0] < array2[0]) {
			return 1;
		}
		return 0;
	});
};

Poker.prototype.checkForMatches = function(hand, matches) {
	var matches = matches || [];

	Poker.sortHand(hand);

	if(hand.length <= 1) return matches;
	else if(typeof(hand[1]) !== 'undefined' && hand[0][0] === hand[1][0] && typeof(hand[2]) !== 'undefined' && hand[0][0] === hand[2][0]){
		matches.push(hand[0][0]*3);
		return this.checkForMatches(hand.splice(3, hand.length-1), matches);
	}
	else if(typeof(hand[1]) !== 'undefined' && hand[0][0] === hand[1][0]){
		matches.push(hand[0][0]*2);
		return this.checkForMatches(hand.splice(2, hand.length-1), matches);
	}
	else return this.checkForMatches(hand.splice(1, hand.length-1), matches);
};

Poker.prototype.checkForStraight = function(hand, sum){
	var sum = sum || 0;
	Poker.sortHand(hand);

	if(hand.length <= 1) return sum + hand[0][0];
	else if('undefined' !== typeof(hand[1]) && (hand[0][0] - hand[1][0]) !== 1) return 0;
	else return this.checkForStraight(hand.splice(1, hand.length-1), sum + hand[0][0]);
};

Poker.prototype.checkForFlush = function(hand, color) {
	var color = color || hand[0][1];
	Poker.sortHand(hand);

	if(hand.length <= 1) return hand[0][0];
	else if(hand[0][1] !== color) return 0;
	else return this.checkForFlush(hand.splice(0, hand.length-2, color));
};

Poker.prototype.checkForFullHouse = function(hand) {
	var twoPairScore = this.checkForTwoPair(hand);
	var tripleScore = this.checkForTriple(hand);
	var fourOfAKindScore = this.checkForFourOfAKind(hand);

	if(twoPairScore[0] > 0 && twoPairScore[1] > 0 && tripleScore > 0 && fourOfAKindScore === 0) {
		return this.getHighestCard(hand)[0];
	}

	return 0;
};

Poker.prototype.checkForFourOfAKind = function(hand) {
	var firstPair  = this.checkForPair(hand);
	var secondPair = this.checkForPair(hand, 1);

	if(firstPair === secondPair)
	{
		return firstPair * 2;
	}
	return 0;
};

Poker.prototype.checkForStraightFlush = function(hand) {
	var flush = this.checkForFlush(hand);
	var straight = this.checkForStraight(hand);

	if(flush > 0 && straight > 0) {
		return this.getHighestCard(hand)[0];
	}

	return 0;
};

Poker.prototype.compareHighestCards = function(hand1, hand2){
	var highestCardFirstHand = [];
	var highestCardSecondHand = [];

	for(var i = 0; i < hand1.length; i++){
		highestCardFirstHand = this.getHighestCard(hand1, i);
		highestCardSecondHand = this.getHighestCard(hand2, i);
		if(highestCardFirstHand[0] > highestCardSecondHand[0])
		{
			return {'hand': hand1, 'card': highestCardFirstHand};
		}
		else if(highestCardFirstHand[0] < highestCardSecondHand[0]){
			return {'hand': hand2, 'card': highestCardSecondHand};
		}
	}
	return {};
};

Poker.prototype.compareHighestPair = function(hand1, hand2) {
	var hand1Pair = this.checkForPair(hand1);
	var hand2Pair = this.checkForPair(hand2);

	if (hand1Pair > hand2Pair) {
		return {'hand': hand1, 'score': hand1Pair / 2};
	} else if(hand1Pair < hand2Pair) {
		return {'hand': hand2, 'score': hand2Pair / 2};
	}

	return {};
};

module.exports = Poker;