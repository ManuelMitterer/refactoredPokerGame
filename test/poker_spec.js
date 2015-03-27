var assert = require("assert"),
    Poker = require("../src/src.js"),
    should = require("should"),
    poker, hand1, hand2, hand3, hand4, hand5;

describe('Array', function(){
  beforeEach(function(){
    poker = new Poker();
    hand1 = [[2, 'C'], [3, 'C'], [4, 'C'], [5, 'C'], [6, 'C']];
    hand2 = [[2, 'C'], [3, 'C'], [1, 'C'], [10, 'C'], [12, 'C']];
    hand3 = [[2, 'D'], [2, 'H'], [5, 'D'], [11, 'H'], [12, 'H']];
    hand4 = [[2, 'D'], [2, 'H'], [11, 'D'], [11, 'H'], [12, 'H']];
    hand5 = [[2, 'D'], [2, 'H'], [2, 'C'], [5, 'H'], [5, 'C']];
  });

  it('should be different', function(){
    assert.notDeepEqual(hand1, hand2);
  })

  it("should be the same", function(){
    tempHand = [[2, 'D'], [2, 'H'], [5, 'D'], [11, 'H'], [12, 'H']];

    assert.deepEqual(hand3, tempHand);
  });

  it("should return highest card", function(){
    var highest = poker.getHighestCard(hand1);
    assert.deepEqual(highest[0], 6);
  });

  it("should check for pair", function(){
    var pair = poker.checkForMatches(hand3);
    assert.deepEqual(pair.doubles, [4]);
  });

  it("should check for two pairs", function(){
    var pair = poker.checkForMatches(hand4);
    assert.deepEqual(pair.doubles, [22, 4]);
  });

  it("should check for pair, no hand", function(){
    var tempHand = [];
    var pair = poker.checkForMatches(tempHand);
    assert.deepEqual(pair, {});
  });

  it("should check for triple", function(){
    var triple = poker.checkForMatches(hand5);
    assert.deepEqual(triple.triple, 6);
  });

  it("should check for no triple", function(){
    var triple = poker.checkForMatches(hand1);
    assert.deepEqual(triple, {});
  });

  it("should check for straight", function(){
    var straight = poker.checkForStraight(hand1);
    assert.deepEqual(straight, 20);
  });

  it("should check for no straight", function(){
    var straight = poker.checkForStraight(hand2);
    assert.deepEqual(straight, 0);
  });

  it("should check for flush", function(){
    var flush = poker.checkForFlush(hand2);
    assert.deepEqual(flush, 12);
  });

  it("should check for no flush", function(){
    var flush = poker.checkForFlush(hand3);
    assert.deepEqual(flush, 0);
  });

  it("should check for full house", function(){
    var fullHouse = poker.checkForFullHouse(hand5);
    assert.deepEqual(fullHouse, 5);
  });

  it("should check for no full house", function(){
    var fullHouse = poker.checkForFullHouse(hand4);
    assert.deepEqual(fullHouse, 0);
  });
})