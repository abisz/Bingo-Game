import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Bingo from '../components/bingo';
import * as bingoActions from '../actions/bingoActions';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class BingoApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <Bingo/>
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(bingoActions, dispatch)
  })
)(BingoApp);
