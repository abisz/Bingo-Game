import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { ListItem, CheckBox, Text } from 'native-base';

export default class TermSelection extends Component {

  listenForTerms(firebaseRef) {
    firebaseRef.on('value', (snap) => {
      let termsList = [];

      snap.forEach( (decks) => {

        for (const deckName in decks.val()) {
          const deck = decks.val()[deckName];

          if ( deckName === this.props.deck ) {
            termsList = deck.terms || [];
          }
        }
      });

      if(this.props.store.getState().bingo.view === 'Term') this.props.actions.termsLoaded(termsList);
    });
  }

  componentDidMount() {
    if ( ! this.props.terms[0] ) {
      this.listenForTerms(this.props.firebase);
    }
  }

  isSelected(term) {
    return this.props.selected.includes(term);
  }

  itemClicked(term) {
    this.props.actions.toggleTerm(term);
  }  
  
  render() {
    let terms = [];

    for (const termkey in this.props.terms) {
      const term = this.props.terms[termkey];
      terms.push(
          <ListItem
            onPress={() => this.itemClicked(term)}>
            <CheckBox
              checked={this.isSelected(term)}
              onPress={() => this.itemClicked(term)}/>
            <Text>{term.title}</Text>
          </ListItem>
      );
    }

    return (
      <View>
        <ScrollView>
          {terms}
        </ScrollView>
      </View>
    );
  }
}
