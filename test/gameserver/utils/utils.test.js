import { expect } from 'chai';

import { isTrial } from '../../../src/gameserver/kitty/utils';

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
});
