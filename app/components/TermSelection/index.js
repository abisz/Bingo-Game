import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import ListItem from '../ListItem';

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
      terms.push(<ListItem
        name={term}
        selected={ this.isSelected(term) }
        select={() => this.itemClicked(term)}
      />)
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
