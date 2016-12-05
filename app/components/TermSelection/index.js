import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { ListItem, CheckBox, Text } from 'native-base';

export default class TermSelection extends Component {
  constructor(props) {
    super(props);
  }

  isSelected(term) {
    return this.props.selected.includes(term);
  }

  itemClicked(term) {
    console.log('Term Clicked');
    console.log(term);

    this.props.actions.toggleTerm(term);
  }  
  
  render() {
    let terms = [];

    this.props.terms.forEach( (term) => {
      terms.push(
        <ListItem>
        <CheckBox checked={true} />
        <Text>{term}</Text>
        </ListItem>)


    /*
      this.props.terms.forEach( (term) => {
      terms.push(<ListItem
        name={term}
        selected={ this.isSelected(term) }
        select={() => this.itemClicked(term)}
      />)
      */
    });

    return (
      <View>
        <ScrollView>
          {terms}
        </ScrollView>
      </View>
    );
  }
}
