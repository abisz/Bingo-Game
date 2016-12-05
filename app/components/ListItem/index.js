import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Button
      onPress={this.props.select}
      title={this.props.name}
      color={this.props.selected ? 'green' : 'grey'}
      />
    );
  }
}
