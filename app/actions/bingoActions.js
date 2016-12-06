import * as types from './actionTypes';

export function selectDeck(deck) {
  return {
    type: types.SELECT_DECK,
    deck: deck
  };
}

export function toggleTerm(term) {
  return {
    type: types.TOGGLE_TERM,
    term: term
  }
}

export function startGame() {
  return {
    type: types.START_GAME
  }
}

export function toggleCell(term) {
  return {
    type: types.TOGGLE_CELL,
    term: term
  }
}

export function decksLoaded(decks) {
  return {
    type: types.DECKS_LOADED,
    decks
  }
}

export function termsLaoded(terms) {
  console.log('ACTION TRIGGERED');

  return {
    type: types.TERMS_LOADED,
    terms
  }
}