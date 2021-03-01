import { expect } from 'chai';

import { isTrial, shuffle, getTrials, getDoubleRuns, getRun, removeArray } from '../../../src/gameserver/kitty/utils';

/**
 * Tests for '/api/users'
 */
describe('Users Controller Test', () => {
  it('should return false if the denomination is not same', () => {
    const deck = [
      {
        denomination: 'A',
      },
      {
        denomination: 'K',
      },
      {
        denomination: 'Q',
      },
    ];

    expect(isTrial(deck)).to.be.equal(false);
  });

  it('should return true if the denomination is not same', () => {
    const deck = [
      {
        denomination: '2',
      },
      {
        denomination: '2',
      },
      {
        denomination: '2',
      },
    ];

    expect(isTrial(deck)).to.be.equal(true);
  });

  it('should return true if the denomination is not same', () => {
    const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(shuffle(deck)).not.to.be.equal(deck);
  });

  // it('should return true if the denomination is not same', () => {
  //   const deck = [
  //     {
  //       denomination: 'K',
  //       precedence: 12,
  //     },
  //     {
  //       denomination: '10',
  //       precedence: 9,
  //     },
  //     {
  //       denomination: 'Q',
  //       precedence: 11,
  //     },
  //     {
  //       denomination: 'J',
  //       precedence: 10,
  //     },
  //     {
  //       denomination: 'A',
  //       precedence: 13,
  //     },
  //   ];

  //   expect(sortDeck(deck)).not.to.be.equal(deck);
  // });
  it('should return trials array if it exists', () => {
    const deck = [
      {
        denomination: 'K',
        precedence: 12,
      },
      {
        denomination: '10',
        precedence: 9,
      },
      {
        denomination: 'Q',
        precedence: 11,
      },
      {
        denomination: 'Q',
        precedence: 11,
      },
      {
        denomination: 'Q',
        precedence: 11,
      },
      {
        denomination: 'J',
        precedence: 10,
      },
      {
        denomination: 'A',
        precedence: 13,
      },
    ];

    const expected = [
      {
        denomination: 'Q',
        precedence: 11,
      },
      {
        denomination: 'Q',
        precedence: 11,
      },
      {
        denomination: 'Q',
        precedence: 11,
      },
    ];
    const actual = getTrials(deck);

    expect(actual).to.eql(expected);
  });
  it('double run test', () => {
    const deck = [
      {
        denomination: 'A',
        precedence: 13,
        suit: {
          name: 'heart',
        },
      },
      {
        denomination: 'K',
        precedence: 12,
        suit: {
          name: 'club',
        },
      },
      {
        denomination: 'Q',
        precedence: 11,
        suit: {
          name: 'club',
        },
      },
      {
        denomination: 'J',
        precedence: 10,
        suit: {
          name: 'club',
        },
      },
      {
        denomination: '10',
        precedence: 9,
        suit: {
          name: 'heart',
        },
      },
    ];

    const expected = [
      {
        denomination: 'K',
        precedence: 12,
        suit: {
          name: 'club',
        },
      },
      {
        denomination: 'Q',
        precedence: 11,
        suit: {
          name: 'club',
        },
      },
      {
        denomination: 'J',
        precedence: 10,
        suit: {
          name: 'club',
        },
      },
    ];
    const actual = getDoubleRuns(deck);

    expect(actual).to.eql(expected);
  });

  it('run test', () => {
    const deck = [
      {
        denomination: 'A',
        precedence: 13,
      },
      {
        denomination: 'K',
        precedence: 12,
      },
      {
        denomination: 'J',
        precedence: 10,
      },
      {
        denomination: '9',
        precedence: 8,
      },
      {
        denomination: '8',
        precedence: 7,
      },
      {
        denomination: '7',
        precedence: 6,
      },
      {
        denomination: '2',
        precedence: 1,
      },
    ];

    const expected = [
      {
        denomination: '9',
        precedence: 8,
      },
      {
        denomination: '8',
        precedence: 7,
      },
      {
        denomination: '7',
        precedence: 6,
      },
    ];
    const actual = getRun(deck);

    expect(actual).to.eql(expected);
  });
  it('remove array test', () => {
    const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const expected = [1, 2, 3, 7, 8, 9];
    const actual = removeArray(deck, [4, 5, 6]);

    expect(actual).to.eql(expected);
  });
});
