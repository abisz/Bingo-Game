import React, {Component} from 'react';
import {TouchableHighlight, Text, StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  cell: {

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
        <Text>{this.props.term}</Text>
      </TouchableHighlight>
    );
  }
}

