import * as types from '../actions/actionTypes';

const initialState = {
};

export default function bingo(state = initialState, action = {}) {
  switch (action.type) {
    case types.EXAMPLE:
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}
