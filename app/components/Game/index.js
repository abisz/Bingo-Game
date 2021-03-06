import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Cell from '../Cell';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFCE6',
    padding: 2
  }
});

export default class Game extends Component {
  constructor(props) {
    super(props);
  }

  isActive(term) {
    return this.props.activeCells.includes(term);
  }

  render() {

    const cells = [];

    this.props.terms.forEach( (term) => {
      cells.push(
        <Cell
          term={term}
          action={this.props.actions.toggleCell}
          active={this.isActive(term)}/>
      )
    });

    return (
      <View style={styles.container}>
        {cells}
      </View>
    );
  }
}
