import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TeamSelector from './TeamSelector';

const data = {
  players: [
    {
      id: '1',
      name: 'Tamim Iqbal',
      role: 'batsman',
      credit: 10,
      team: 'a',
    },
    {
      id: '2',
      name: 'Mashrafee Murtoza',
      role: 'bowler',
      credit: 9,
      team: 'b',
    },
    {
      id: '3',
      name: 'Mushfique',
      role: 'batsman',
      credit: 9,
      team: 'a',
    },
    {
      id: '4',
      name: 'Alamin Hossain',
      role: 'bowler',
      credit: 11,
      team: 'a',
    },
    {
      id: '5',
      name: 'Alamin Hossain',
      role: 'batsman',
      credit: 11,
      team: 'a',
    },
    {
      id: '6',
      name: 'Alamin Hossain',
      role: 'bowler',
      credit: 11,
      team: 'a',
    },
    {
      id: '7',
      name: 'Alamin Hossain',
      role: 'batsman',
      credit: 11,
      team: 'a',
    },
    {
      id: '8',
      name: 'Alamin Hossain',
      role: 'bowler',
      credit: 11,
      team: 'a',
    },
  ],
};

const Container = () => {
  return (
    <View style={styles.bg}>
      <TeamSelector
        data={data}
        onSubmit={players => {
          console.log(players);
        }}
      />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
