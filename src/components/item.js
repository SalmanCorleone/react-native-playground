import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export class item extends Component {
  render() {
    return (
      <View style={styles.bg}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {},
});

export default item;
