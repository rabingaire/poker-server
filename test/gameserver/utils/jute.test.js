import { expect } from 'chai';

import { getHighestJute, } from '../../../src/gameserver/kitty/utils';

/**
 * Tests for '/api/users'
 */
describe('Jute Test', () => {

  it('jute first test', () => {
    // A, 2, 4 and K, Q, 10
    const deck = [
      {
        denomination: 'A',
        precedence: 13,
      },
      {
        denomination: 'A',
        precedence: 13,
      },
      {
        denomination: 'K',
        precedence: 12,
      },
      {
        denomination: 'K',
        precedence: 12,
      },
      {
        denomination: 'Q',
        precedence: 11,
      },
      {
        denomination: '4',
        precedence: 3,
      },
      {
        denomination: '2',
        precedence: 1,
      },
    ];

    const expected = [
      {
        denomination: 'A',
        precedence: 13,
      },
      {
        denomination: 'A',
        precedence: 13,
      },
      {
        denomination: '2',
        precedence: 1,
      },
    ];

    const actual = getHighestJute(deck);

    expect(actual).to.eql(expected);
  });
});
