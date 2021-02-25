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

/**
 * Returns shuffled deck.
 * The original array is unchanged.
 * // https://stackoverflow.com/questions/40057647/what-is-the-best-algorithm-to-shuffle-cards.
 * 
 * @param {Array} cardsArray
 */
export function shuffle(cardsArray) {
  const shuffeledDeck = [...cardsArray];

  for(let i = cardsArray.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i) + 1;

    const temp = shuffeledDeck[j];

    shuffeledDeck[j] = shuffeledDeck[i];
    shuffeledDeck[i] = temp;
  }

  return shuffeledDeck;
}

/**
 * Returns sorted deck.
 * The original array is unchanged.
 * 
 * @param {Array} cardsArray
 */
export function sortDeck(cardsArray) {
  const sorted = cardsArray.sort((a, b) => b.precedence - a.precedence);

  return sorted;
}


/**
 * Returns the strongest card suit from the array.
 * The array is assumed to be sorted.
 * The original array is unchanged.
 * 
 * @param {Array} sortedArray
 */
export function getStrongestCardGroup(sortedArray) {
  if(sortedArray.length === 3) {
    return sortedArray;
  }
  // trials
  const highestTrials = getTrials(sortedArray);

  if(highestTrials) {
    return highestTrials;
  }  
  // double run
  const doubleRuns = getDoubleRuns(sortedArray);

  if(doubleRuns) {
    return doubleRuns;
  }
  // run
  const runs = getRun(sortedArray);

  if(runs) {
    return runs;
  }
  // color
  // const colorSort = 
  
  return sortedArray;
}

/**
 * Returns sorted array for color checking.
 * 
 * @param {Array} sortedArray
 */
export function getHighestJute(sortedArray) {
  const result = {};

  // segregrate cards by denomination
  sortedArray.forEach(item => {
    const { denomination } = item;

    if(result[[denomination]]) {
      result[[denomination]].push(item);
    } else {
      result[[denomination]] = [item];
    }
  });
  // take lowest from discard pile for the third card in jute
  const discardPile = [];
  let maxJutePrecedence = 1; // this is for card with 2 as its face
  let maxJuteKey = '2';

  // test if we have jutes
  const jutes = {};

  for (const [key, value] of Object.entries(result)) {

    if(value.length > 1) {
      // this is jute
      jutes[[key]] = value;
      if(value[0].precedence > maxJutePrecedence) {
        maxJutePrecedence = value[0].precedence;
        maxJuteKey = value[0].denomination;
      }
    } else {
      // this is single card
      discardPile.push(value[0]);
    }
  }

  

  // segregrate result to jutes and discard pile

  // if discard pile is empty take the lowest jute as the third card

  


}

/**
 * Returns sorted array for color checking.
 * 
 * @param {Array} sortedArray
 */
export function sortByColorAndPrecedence(sortedArray) {
  const result = {
    spade: [],
    club: [],
    diamond: [],
    heart: [],
  }

  sortedArray.forEach(item => {
    const { suit : { name }} = item;

    result[[name]].push(item);
  });

  result.spade = sortDeck(result.spade);
  result.club = sortDeck(result.club);
  result.diamond = sortDeck(result.diamond);
  result.heart = sortDeck(result.heart);
  
  return result;
}

/**
 * Returns sorted array for color checking.
 * 
 * @param {Array} sortedArray
 */
export function getHighestColor(sortedArray) {
  const result = sortByColorAndPrecedence(sortedArray);
  const validColors = [];

  // ensures that highest 3 elements are taken
  if(result.spade.length >= 3) {
    validColors.push(result.spade.slice(0, 3));
  }
  if(result.club.length >= 3) {
    validColors.push(result.club.slice(0, 3));
  }
  if(result.diamond.length >= 3) {
    validColors.push(result.diamond.slice(0, 3));
  }
  if(result.heart.length >= 3) {
    validColors.push(result.heart.slice(0, 3));
  }
  // basic checks
  if(validColors.length === 0) {
    return null;
  }
  
  if(validColors.length === 1) {
    return validColors[0];
  }
  
  // weighting algorithm
  // every subsequent multiplication needs to be by order of 100 to avoid complicated loops
  // gives correct results for colors of A, 2, 4 and K, Q, 10
  const weights = validColors.map(color => {
    return color[0].precedence * 10000 + color[1].precedence * 100 + color[2].precedence;
  });

  const maxWeight = Math.max(...weights);

  const index = weights.indexOf(maxWeight);

  return validColors[index];
}

/**
 * Returns trial if exists else null.
 * The array is assumed to be sorted.
 * The original array is unchanged.
 * 
 * @param {Array} sortedArray
 */
export function getTrials(sortedArray) {
  for(let i = 2; i <= sortedArray.length; i++) {
    const a = sortedArray[i - 2];
    const b = sortedArray[i - 1];
    const c = sortedArray[i];

    if (a.denomination === b.denomination && a.denomination === c.denomination) {
      return [a, b, c];
    }
  }
  
  return null;
}

/**
 * Returns trial if exists else null.
 * The array is assumed to be sorted.
 * The original array is unchanged.
 * 
 * @param {Array} sortedArray
 */
export function getDoubleRuns(sortedArray) {
  for(let i = 2; i <= sortedArray.length; i++) {
    const a = sortedArray[i - 2];
    const b = sortedArray[i - 1];
    const c = sortedArray[i];

    // check run
    if(b.precedence + 1 !== a.precedence || b.precedence -1 !== c.precedence) {
      continue;
    }

    // check suit
    if(b.suit.name !== a.suit.name || b.suit.name !== c.suit.name) {
      continue;
    }

    return [a, b, c];
  }

  return null;
}

/**
 * Returns trial if exists else null.
 * The array is assumed to be sorted.
 * The original array is unchanged.
 * 
 * @param {Array} sortedArray
 */
export function getRun(sortedArray) {
  for(let i = 2; i <= sortedArray.length; i++) {
    const a = sortedArray[i - 2];
    const b = sortedArray[i - 1];
    const c = sortedArray[i];

    // check run
    if(b.precedence + 1 !== a.precedence || b.precedence -1 !== c.precedence) {
      continue;
    }

    return [a, b, c];
  }
  
  return null;
}