import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as bingoActions from '../actions/bingoActions';
import { connect } from 'react-redux';

import { AlertIOS, Text } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Fab, Spinner} from 'native-base';

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
    this.props.actions.startGame();
  }

  clickBack() {
    this.props.actions.back();
  }

  add() {
    AlertIOS.prompt(
      'Name of ' + this.props.state.view,
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Save', onPress: name => this.save(name)},
      ]
    );
  }

  save(name) {

    if (this.props.state.view === 'Deck') {
      this.firebaseRef.child('decks').push({
        title: name,
        terms: []
      });
    } else {
      this.firebaseRef.child('decks').child(this.props.state.deckSelected).child('terms').push({
        title: name
      })
    }
  }

  render() {
    const {state, actions, store} = this.props;

    // console.log(state);
    console.log('STOOOOOORE');
    console.log(store.getState().bingo);


    let view, title, playBtn, backBtn, fab, spinner;

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
        firebase={this.firebaseRef}
        store={store}
      />);

    } else if ( ! state.started ) {
      title = 'Term Selection';

      view = (<TermSelection
        terms={state.terms}
        deck={state.deckSelected}
        selected={state.termsSelected}
        actions={actions}
        firebase={this.firebaseRef}
        store={store}
      />);

      if (state.readyToPlay) {
        playBtn = (<Button transparent
        onPress={() => this.clickStart()}>
          <Text>Start</Text>
        </Button>);
      } else {
        playBtn = (<Button disabled transparent>
          <Text>{state.termsSelected.length}/16</Text>
        </Button>)
      }
    } else {
      title = 'Game';
      view = (<Game
        terms={state.termsSelected}
        actions={actions}
        activeCells={state.activeCells}
      />);
    }

    if (state.bingo && state.started) {
      AlertIOS.alert(
        'Christopher Waltz',
        'Oooh, that\'s a BINGO!'
      );
    }

    if (!state.started){
      fab = (<Fab
        active='true'
        containerStyle={{ marginLeft: 10 }}
        style={{ backgroundColor: '#4CD4B0' }}
        onPress={() => this.add()}>
        <Icon name="md-add" />
      </Fab>);
    }

    if (!state.decksAll[0]) {
      spinner = (<Spinner color='#4CD4B0' />);
    }

    return (
      <Container>
        <Header >
          { backBtn }
          <Title>{title}</Title>
          { playBtn }
        </Header>
        <Content>
          {spinner}
          {view}
        </Content>
        {fab}
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
