import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Cell from '../Cell';

export default class Game extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const cells = [];

    this.props.terms.forEach( (term) => {
      cells.push(
        <Cell term={term}
        action={this.props.actions.toggleCell}/>
      )
    });

    return (
      <View>
        {cells}
      </View>
    );
  }
}
