import React, {Component} from 'react';
import {View, TouchableHighlight, Text, StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  cell: {
    width: 88,
    height: 110,
    padding: 6,
    margin: 2,
    borderRadius: 5,
    backgroundColor: '#EDD834'
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
    const {height, width} = Dimensions.get('window');

    return (
      <TouchableHighlight
        style={styles.cell}
        onPress={() => this.pressed()}>
        <Text style={styles.cellText}>{this.props.term}</Text>
      </TouchableHighlight>
    );
  }
}

