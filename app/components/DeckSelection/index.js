import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ListItem from '../ListItem';

export default class DeckSelection extends Component {

  listenForDecks(decksRef) {
    decksRef.on('value', (snap) => {
      const deckList = [];

      snap.forEach( (decks) => {

        for (const deck in decks.val()) {
          deckList.push({
            title: decks.val()[deck].title,
            key: deck
          });
        }
      });
      this.props.actions.decksLoaded(deckList);
    });
  }
  
  componentDidMount() {
    if ( ! this.props.decks[0]) {
      this.listenForDecks(this.props.firebase);
    }
  }
  
  itemClicked(deck) {
    this.props.actions.selectDeck(deck.key);
  }

  render() {

    let decks = [];

    if (this.props.decks[0]) {
      this.props.decks.forEach( (deck) => {
        decks.push(<ListItem
          name={deck.title}
          select={() => this.itemClicked(deck)}
        />)
      });
    }

    return (
      <View>
        {decks}
      </View>
    );
  }
}
