import * as types from '../actions/actionTypes';

const initialState = {
  decksAll: ['Harry Potter', 'Meeting', 'Lord of the Rings'],
  deckSelected: false,
  terms: ['Hermine', 'Ron', 'Harry', 'Serious', 'Hagrid',
    'Dumbledore', 'Voldemort', 'Petunia', 'Snape', 'Goyle',
    'Fred', 'Ginny', 'George', 'Dudley', 'Fleur', 'Lupin',
    'Dolores', 'Gandalf', 'Bilbo', 'Sam', 'Aragorn',
    'Frodo', 'Legolas', 'Gollum', 'Arwen', 'Gimli',
    'Elrond', 'Boromir', 'Nekromant', 'Galadriel'],
  termsSelected: ['Hermine', 'Ron', 'Harry', 'Serious', 'Hagrid',
    'Dumbledore', 'Voldemort', 'Petunia', 'Snape', 'Goyle',
    'Fred', 'Ginny', 'George', 'Dudley', 'Fleur',
    'Dolores', 'Gandalf', 'Bilbo', 'Sam', 'Aragorn',
    'Frodo', 'Legolas', 'Gollum', 'Arwen', 'Gimli'],
  activeCells: [],
  started: false
};

export default function bingo(state = initialState, action = {}) {
  switch (action.type) {

    case types.SELECT_DECK:
      return {
        ...state,
        deckSelected: action.deck
      };

    case types.TOGGLE_TERM:

      let selected = [];

      if (state.termsSelected.includes(action.term)) {
        selected = state.termsSelected.filter( (t) => t != action.term );
      } else {
        selected = state.termsSelected.concat([action.term]);
      }

      const readyToPlay = (selected.length === 25);

      return {
        ...state,
        termsSelected: selected,
        readyToPlay
      };

    case types.START_GAME:

      const termsShuffled = shuffle(state.termsSelected);

      return {
        ...state,
        termsSelected: termsShuffled,
        started: true
      };

    case types.TOGGLE_CELL:

      const term = action.term;
      let activeCells;

      if (state.activeCells.includes(term)) {
        activeCells = state.activeCells.filter( (t) => t != term);
      } else {
        activeCells = state.activeCells.concat([term]);
      }

      const bingo = getBingo(activeCells.map( c => state.termsSelected.indexOf(c)));

      return {
        ...state,
        activeCells,
        bingo
      };

    default:
      return state;
  }
}

function shuffle(a) {
  const b = Object.assign([], a);
  for (let i = b.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [b[i - 1], b[j]] = [b[j], b[i - 1]];
  }
  return b;
}

function getBingo(activeCells) {
  // columns
  for (let i = 0; i < 5; i++) {
    if (activeCells.filter( c => c % 5 === i).length === 5) return true;
  }

  // rows
  for (let i = 1; i <= 5; i++) {
    if (activeCells.filter( c => c >= (i-1) * 5 && c < i * 5).length === 5) return true;
  }

  // diagonal
  if (activeCells.filter(c => c === 0 || c === 6 || c === 12 || c === 18 || c === 24).length ===5) return true;
  if (activeCells.filter(c => c === 4 || c === 8 || c === 12 || c === 16 || c === 20).length ===5) return true;

  return false;
}