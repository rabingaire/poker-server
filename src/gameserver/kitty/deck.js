import { COLOR_BLACK, COLOR_RED, CLUB, DIAMOND, HEART, SPADE } from './constants';

export const CLUB_DECK = [
  {
    denomination: 'A',
    precedence: 13,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: 'K',
    precedence: 12,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: 'Q',
    precedence: 11,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: 'J',
    precedence: 10,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '10',
    precedence: 9,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '9',
    precedence: 8,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '8',
    precedence: 7,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '7',
    precedence: 6,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '6',
    precedence: 5,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '5',
    precedence: 4,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '4',
    precedence: 3,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '3',
    precedence: 2,
    suit: CLUB,
    color: COLOR_BLACK,
  },
  {
    denomination: '2',
    precedence: 1,
    suit: CLUB,
    color: COLOR_BLACK,
  },
];

export const SPADE_DECK = [
  {
    denomination: 'A',
    precedence: 13,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: 'K',
    precedence: 12,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: 'Q',
    precedence: 11,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: 'J',
    precedence: 10,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '10',
    precedence: 9,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '9',
    precedence: 8,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '8',
    precedence: 7,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '7',
    precedence: 6,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '6',
    precedence: 5,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '5',
    precedence: 4,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '4',
    precedence: 3,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '3',
    precedence: 2,
    suit: SPADE,
    color: COLOR_BLACK,
  },
  {
    denomination: '2',
    precedence: 1,
    suit: SPADE,
    color: COLOR_BLACK,
  },
];

export const HEART_DECK = [
  {
    denomination: 'A',
    precedence: 13,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: 'K',
    precedence: 12,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: 'Q',
    precedence: 11,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: 'J',
    precedence: 10,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '10',
    precedence: 9,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '9',
    precedence: 8,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '8',
    precedence: 7,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '7',
    precedence: 6,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '6',
    precedence: 5,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '5',
    precedence: 4,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '4',
    precedence: 3,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '3',
    precedence: 2,
    suit: HEART,
    color: COLOR_RED,
  },
  {
    denomination: '2',
    precedence: 1,
    suit: HEART,
    color: COLOR_RED,
  },
];

export const DIAMOND_DECK = [
  {
    denomination: 'A',
    precedence: 13,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: 'K',
    precedence: 12,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: 'Q',
    precedence: 11,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: 'J',
    precedence: 10,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '10',
    precedence: 9,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '9',
    precedence: 8,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '8',
    precedence: 7,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '7',
    precedence: 6,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '6',
    precedence: 5,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '5',
    precedence: 4,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '4',
    precedence: 3,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '3',
    precedence: 2,
    suit: DIAMOND,
    color: COLOR_RED,
  },
  {
    denomination: '2',
    precedence: 1,
    suit: DIAMOND,
    color: COLOR_RED,
  },
];

export const DECK = [...CLUB_DECK, ...SPADE_DECK, ...HEART_DECK, ...DIAMOND_DECK];
