import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as bingoActions from '../actions/bingoActions';
import { connect } from 'react-redux';

import { Text, View, Navigator, StatusBar } from 'react-native';
import { Container, Header, Title, Content} from 'native-base';

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

    let view, title;

    if ( ! state.deckSelected ) {
      title = 'Deck Selection';
      view = (<DeckSelection
        decks={state.decksAll}
        actions={actions} />);

    } else if ( ! state.started ) {
      title = 'Term Selection';
      view = (<TermSelection
        terms={state.terms}
        deck={state.deckSelected}
        selected={state.termsSelected}
        actions={actions} />);
    } else {
      title = 'Game';
      view = (<Game />);
    }

    return (
      <Container>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Content>
          {view}
        </Content>
      </Container>
    );


  }
}

export default connect(state => ({
    state: state.bingo
  }),
  (dispatch) => ({
    actions: bindActionCreators(bingoActions, dispatch)
  })
)(BingoApp);
