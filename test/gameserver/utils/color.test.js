import { expect } from 'chai';

import { DECK } from '../../../src/gameserver/kitty/deck';
import { HEART, SPADE } from '../../../src/gameserver/kitty/constants';
import { getHighestColor, shuffle, sortByColorAndPrecedence } from '../../../src/gameserver/kitty/utils';

/**
 * Tests for '/api/users'
 */
describe('Users Controller Test', () => {

  it('run test', () => {
    const deck = shuffle(DECK);
    const hand = deck.slice(0, 9);

    const result = sortByColorAndPrecedence(hand);


    result.spade.forEach(element => {
      expect(element.suit.name).to.equal('spade');
    });
    result.club.forEach(element => {
      expect(element.suit.name).to.equal('club');
    });
    result.diamond.forEach(element => {
      expect(element.suit.name).to.equal('diamond');
    });
    result.spade.forEach(element => {
      expect(element.suit.name).to.equal('spade');
    });

    
  });

  it('color test', () => {
    // A, 2, 4 and K, Q, 10
    const deck = [
      {
        denomination: 'A',
        precedence: 13,
        suit: HEART,        
      },
      {
        denomination: 'K',
        precedence: 12,
        suit: SPADE,        
      },
      {
        denomination: 'Q',
        precedence: 11,
        suit: SPADE,        
      },
      {
        denomination: '10',
        precedence: 9,
        suit: SPADE,        
      },
      {
        denomination: '4',
        precedence: 3,
        suit: HEART,        
      },
      {
        denomination: '2',
        precedence: 1,
        suit: HEART,
      },
    ];

    const expected = [
      {
        denomination: 'A',
        precedence: 13,
        suit: HEART,        
      },
      {
        denomination: '4',
        precedence: 3,
        suit: HEART,        
      },
      {
        denomination: '2',
        precedence: 1,
        suit: HEART,
      },
    ];

    const actual = getHighestColor(deck);

    expect(actual).to.eql(expected);
  });
});
