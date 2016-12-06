import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as bingoActions from '../actions/bingoActions';
import { connect } from 'react-redux';

import { AlertIOS, Text } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Fab} from 'native-base';

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

  isDeckSelection() {
    return this.props.state.terms.length === 0;
  }

  add() {
    AlertIOS.prompt(
      'Name of ' + (this.isDeckSelection() ? "Deck" : "Term"),
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Save', onPress: name => this.save(name, this.isDeckSelection())},
      ]
    );
  }

  save(name, isDeck) {

    if (isDeck) {
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
    const {state, actions} = this.props;

    // console.log(state);

    let view, title, playBtn, backBtn, fab;

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
