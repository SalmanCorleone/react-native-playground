import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../config/Theme';

const SwipeCard = ({ task }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.txt}>{task.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
  },
  txt: {
    fontFamily: 'SairaSemiCondensed-Medium',
    color: theme.dark,
    fontSize: 18,
  },
});

export default SwipeCard;
