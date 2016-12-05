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