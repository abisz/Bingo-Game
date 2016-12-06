import * as types from '../actions/actionTypes';

const bingoSize = 4;

const initialState = {
  decksAll: [],
  deckSelected: false,
  activeCells: [],
  terms: [],
  termsSelected: [],
  started: false,
  view: 'Deck'
};

export default function bingo(state = initialState, action = {}) {
  switch (action.type) {

    case types.SELECT_DECK:
      return {
        ...state,
        deckSelected: action.deck,
        view: 'Term'
      };

    case types.TOGGLE_TERM:

      let selected = [];

      if (state.termsSelected.includes(action.term)) {
        selected = state.termsSelected.filter( (t) => t != action.term );
      } else {
        selected = state.termsSelected.concat([action.term]);
      }

      const readyToPlay = (selected.length === 16);

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
        started: true,
        activeCells: []
      };

    case types.TOGGLE_CELL:

      const term = action.term;
      let activeCells;

      if (state.activeCells.includes(term)) {
        activeCells = state.activeCells.filter( (t) => t.key !== term.key);
      } else {
        activeCells = state.activeCells.concat([term]);
      }

      const bingo = getBingo(activeCells.map( c => state.termsSelected.indexOf(c)));

      return {
        ...state,
        activeCells,
        bingo
      };

    case types.DECKS_LOADED:

      return {
        ...state,
        decksAll: action.decks
      };

    case types.TERMS_LOADED:

      const terms = [];

      for (const key in action.terms) {
        terms.push({
          key,
          title: action.terms[key].title
        });
      }

      const termsSelected = shuffle(terms).slice(0, 16);

      console.log('LOADED SHUFFLE');
      console.log(termsSelected.length);
      // console.log(action.terms);

      const rtp = (termsSelected.length === 16);

      return {
        ...state,
        terms,
        termsSelected,
        readyToPlay: rtp
      };

    case types.BACK:
      if (state.started) {
        // Game
        return {
          ...state,
          started: false
        }
      } else {
        // Term selection
        return {
          ...state,
          terms: [],
          termsSelected: [],
          deckSelected: false,
          readyToPlay: false,
          view: 'Deck'
        }
      }

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
  for (let i = 0; i < bingoSize; i++) {
    if (activeCells.filter( c => c % bingoSize === i).length === bingoSize) return true;
  }

  // rows
  for (let i = 1; i <= bingoSize; i++) {
    if (activeCells.filter( c => c >= (i-1) * bingoSize && c < i * bingoSize).length === bingoSize) return true;
  }

  // diagonal
  // if (activeCells.filter(c => c === 0 || c === 6 || c === 12 || c === 18 || c === 24).length === 5) return true;
  // if (activeCells.filter(c => c === 4 || c === 8 || c === 12 || c === 16 || c === 20).length === 5) return true;
  if (activeCells.filter(c => c === 0 || c === 5 || c === 10 || c === 15 ).length === 4) return true;
  if (activeCells.filter(c => c === 3 || c === 6 || c === 9 || c === 12 ).length === 4) return true;

  return false;
}