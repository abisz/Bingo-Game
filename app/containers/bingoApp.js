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
    const state = this.props.state.bingo;
    const actions = this.props.action;

    if ( ! state.deckSelected ) {
      return (
        <DeckSelection/>
      );
    } else if ( ! state.readyToPlay ) {
      return (
        <TermSelection />
      );
    } else {
      return (
        <Game />
      );
    }


  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(bingoActions, dispatch)
  })
)(BingoApp);
