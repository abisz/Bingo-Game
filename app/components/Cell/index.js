import React, {Component} from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cell: {
    width: 88,
    height: 110,
    padding: 6,
    margin: 2,
    borderRadius: 5,
    backgroundColor: '#EDD834'
  },
  active: {
    backgroundColor: '#ff0000'
  },
  cellText: {
    fontSize: 12,
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});

export default class Cell extends Component{
  constructor(props) {
    super(props);
  }

  pressed() {
    console.log('Pressed', this.props.term);

    this.props.action(this.props.term);
  }

  render() {

    const cellStyle = [styles.cell];

    if (this.props.active) cellStyle.push(styles.active);

    return (
      <TouchableHighlight
        style={StyleSheet.flatten(cellStyle)}
        onPress={() => this.pressed()}>
        <Text style={styles.cellText}>{this.props.term}</Text>
      </TouchableHighlight>
    );
  }
}

