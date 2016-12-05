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

  render() {
    const {height, width} = Dimensions.get('window');

    return (
      <TouchableHighlight style={styles.cell}>
        <Text>{this.props.term}</Text>
      </TouchableHighlight>
    );
  }
}

