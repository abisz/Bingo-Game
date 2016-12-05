import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import ListItem from '../ListItem';

export default class DeckSelection extends Component {
  constructor(props) {
    super(props);
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
        <Text>Deck Selection</Text>
        {decks}
      </View>
    );
  }
}
