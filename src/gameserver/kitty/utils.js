/**
 * Returns the strength of 3 card combination.
 * The array should be non-empty with three cards only.
 *
 * @param {Array} cardsArray
 */
export function getCardStrength(cardsArray) {
  if (!Array.isArray(cardsArray) && cardsArray.length !== 3) {
    throw new Error('Invalid input array');
  }
}

/**
 * Returns true if the three cards is a trial.
 * The array should be non-empty with three cards only.
 *
 * @param {Array} cardsArray
 */
export function isTrial(cardsArray) {
  const [a, b, c] = cardsArray;

  return a.denomination === b.denomination && a.denomination === c.denomination;
}
