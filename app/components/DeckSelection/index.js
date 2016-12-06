import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import * as firebase from 'firebase';
import secret from '../../../secret';

import ListItem from '../ListItem';

const firebaseConfig = secret;
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class DeckSelection extends Component {
  constructor(props) {
    super(props);

    this.decksRef = firebaseApp.database().ref();

  }

  listenForDecks(decksRef) {
    console.log('LISTENING FOR DECKS');

    decksRef.on('value', (snap) => {
      console.log('NEW SNAP');
      snap.forEach( (deck) => {
        console.log(deck);

      });
    });
  }
  
  componentDidMount() {

    console.log('DECKSELECTION MOUNTING');
    this.listenForDecks(this.decksRef);
    
  }
  
  itemClicked(deck) {
    console.log('Deck selected', deck);

    this.props.actions.selectDeck(deck);
  }

  render() {

    let decks = [];

    this.props.decks.forEach( (deck) => {
      decks.push(<ListItem
        name={deck}
        select={() => this.itemClicked(deck)}
      />)
    });

    return (
      <View>
        {decks}
      </View>
    );
  }
}
