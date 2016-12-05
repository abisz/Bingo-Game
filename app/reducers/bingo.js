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
    'Fred', 'Ginny', 'George', 'Dudley', 'Fleur', 'Lupin',
    'Dolores', 'Gandalf', 'Bilbo', 'Sam', 'Aragorn',
    'Frodo', 'Legolas', 'Gollum', 'Arwen', 'Gimli'],
  readyToPlay: false,
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

    default:
      return state;
  }
}
