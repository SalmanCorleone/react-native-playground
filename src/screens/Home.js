import React from 'react';
import { StyleSheet, Text, ScrollView, StatusBar } from 'react-native';
import TouchableBlock from '../components/TouchableBlock';
import { useNavigation } from '@react-navigation/native';
import Block from '../components/Block';
import Theme from '../config/Theme';

const Home = () => {
  const nav = useNavigation();

  const OPTIONS = [
    { name: 'Liquid Mask', func: () => nav.navigate('LiquidMask') },
    { name: 'Swipe List', func: () => nav.navigate('Tasks') },
    { name: 'Tab Selector', func: () => nav.navigate('Team') },
  ];

  return (
    <Block flex={1} bg="white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Block p={10} mt={10}>
        <Text style={styles.header}>Index</Text>
      </Block>
      <ScrollView>
        {OPTIONS.map((opt, i) => (
          <TouchableBlock
            key={i}
            bg="white"
            p={25}
            m={10}
            onPress={opt.func}
            shadow>
            <Text style={styles.txt}>{opt.name}</Text>
          </TouchableBlock>
        ))}
      </ScrollView>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 30,
    fontWeight: 'bold',
    color: Theme.blue,
  },
  txt: {
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    color: Theme.dark,
  },
});
