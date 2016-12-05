import * as types from '../actions/actionTypes';

const initialState = {
  deckAll: ['Harry Potter', 'Meeting', 'Lord of the Rings'],
  deckSelected: 'Harry Potter',
  readyToPlay: true
};

export default function bingo(state = initialState, action = {}) {
  switch (action.type) {

    case types.SELECT_DECK:
      return {
        ...state,
        deckSelected: action.deck
      };

    case types.TOGGLE_TERM:
      return {
        ...state,
        termSelected: action.term
      };

    default:
      return state;
  }
}
