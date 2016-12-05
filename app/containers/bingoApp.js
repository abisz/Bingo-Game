import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as bingoActions from '../actions/bingoActions';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import DeckSelection from '../components/DeckSelection';
import TermSelection from '../components/TermSelection';
import Game from '../components/Game';

class BingoApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {state, actions} = this.props;

    console.log(state);

    if ( ! state.deckSelected ) {
      return (
        <DeckSelection
          decks={state.decksAll}
          actions={actions} />
      );
    } else if ( ! state.started ) {
      return (
        <TermSelection
          terms={state.terms}
          deck={state.deckSelected}
          selected={state.termsSelected}
          actions={actions} />
      );
    } else {
      return (
        <Game />
      );
    }


  }
}

export default connect(state => ({
    state: state.bingo
  }),
  (dispatch) => ({
    actions: bindActionCreators(bingoActions, dispatch)
  })
)(BingoApp);
