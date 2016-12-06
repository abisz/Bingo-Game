import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as bingoActions from '../actions/bingoActions';
import { connect } from 'react-redux';

import { AlertIOS } from 'react-native';
import { Container, Header, Title, Content, Button, Icon} from 'native-base';

import DeckSelection from '../components/DeckSelection';
import TermSelection from '../components/TermSelection';
import Game from '../components/Game';

import * as firebase from 'firebase';
import secret from '../../secret';

const firebaseApp = firebase.initializeApp(secret);

class BingoApp extends Component {
  constructor(props) {
    super(props);

    this.firebaseRef = firebaseApp.database().ref();

  }
  
  clickStart() {
    console.log('START THE GAME');
    this.props.actions.startGame();
  }

  clickBack() {
    this.props.actions.back();
  }

  render() {
    const {state, actions} = this.props;

    // console.log(state);

    let view, title, playBtn, backBtn;

    backBtn = (<Button transparent
                       onPress={() => this.clickBack()}>
      <Icon name='ios-arrow-back' />
    </Button>);

    if ( ! state.deckSelected ) {
      title = 'Deck Selection';
      backBtn = '';
      view = (<DeckSelection
        decks={state.decksAll}
        actions={actions}
        firebase={this.firebaseRef} />);

    } else if ( ! state.started ) {
      title = 'Term Selection';
      
      view = (<TermSelection
        terms={state.terms}
        deck={state.deckSelected}
        selected={state.termsSelected}
        actions={actions}
        firebase={this.firebaseRef}/>);

      if (state.readyToPlay) {
        playBtn = (<Button transparent
        onPress={() => this.clickStart()}>
          <Icon name="ios-play" />
        </Button>);
      }
    } else {
      title = 'Game';
      view = (<Game
        terms={state.termsSelected}
        actions={actions}
        activeCells={state.activeCells}
      />);
    }

    if (state.bingo) {
      AlertIOS.alert(
        'Christopher Waltz',
        'Oooh, that\'s a BINGO!'
      );
    }

    return (
      <Container>
        <Header >
          { backBtn }
          <Title>{title}</Title>
          { playBtn }
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
