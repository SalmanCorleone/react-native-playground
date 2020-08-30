import React, { useState, useEffect } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import Block from '../components/Block';
import TouchableBlock from '../components/TouchableBlock';
import Txt from '../components/Txt';

const TeamSelector = ({ data, onSubmit }) => {
  const [batsmanList, setBatsmanList] = useState([]);
  const [bowlerList, setBowlerList] = useState([]);
  const [selectedTab, setTab] = useState('bat');
  const [batsmanCount, setBatsmanCount] = useState(0);
  const [bowlerCount, setBowlerCount] = useState(0);

  useEffect(() => {
    let bowlers = [];
    let batsmen = [];

    data.players.map(item => {
      if (item.role === 'batsman') {
        batsmen.push({ ...item, selected: false });
      } else if (item.role === 'bowler') {
        bowlers.push({ ...item, selected: false });
      }
    });

    setBatsmanList(batsmen);
    setBowlerList(bowlers);
  }, [data]);

  const selectTab = tab => setTab(tab);

  const submit = () => {
    if (batsmanCount < 2) {
      ToastAndroid.show('You can only select 1-3 batsmen', ToastAndroid.SHORT);
      return;
    }
    if (bowlerCount < 2) {
      ToastAndroid.show('You can only select 1-3 bowlers', ToastAndroid.SHORT);
      return;
    }
    let selectedBats = batsmanList.filter(item => item.selected);
    let selectedBowls = bowlerList.filter(item => item.selected);
    onSubmit([...selectedBats, ...selectedBowls]);
  };

  const selectPlayer = player => {
    if (player.role === 'batsman') {
      let clonedList = [...batsmanList];
      let index = clonedList.findIndex(item => item.id === player.id);
      let selected = clonedList[index].selected;

      if (selected) {
        clonedList[index].selected = false;
        setBatsmanCount(batsmanCount - 1);
      } else {
        if (batsmanCount >= 3) {
          ToastAndroid.show(
            'Cannot choose player. You have already selected 3 batsmen.',
            ToastAndroid.SHORT,
          );
          return;
        } else if (bowlerCount + batsmanCount > 4) {
          ToastAndroid.show(
            'You habve already selected 5 players!',
            ToastAndroid.SHORT,
          );
          return;
        }
        clonedList[index].selected = true;
        setBatsmanCount(batsmanCount + 1);
      }
      setBatsmanList(clonedList);
    } else if (player.role === 'bowler') {
      let clonedList = [...bowlerList];
      let index = clonedList.findIndex(item => item.id === player.id);
      let selected = clonedList[index].selected;

      if (selected) {
        clonedList[index].selected = false;
        setBowlerCount(bowlerCount - 1);
      } else {
        if (bowlerCount >= 3) {
          ToastAndroid.show(
            'Cannot choose player. You have already selected 3 bowlers.',
            ToastAndroid.SHORT,
          );
          return;
        } else if (bowlerCount + batsmanCount > 4) {
          ToastAndroid.show(
            'You habve already selected 5 players!',
            ToastAndroid.SHORT,
          );
          return;
        }
        clonedList[index].selected = true;
        setBowlerCount(bowlerCount + 1);
      }
      setBowlerList(clonedList);
    }
  };

  const renderListItem = (item, index) => (
    <TouchableBlock
      row
      mv={5}
      ph={5}
      pv={12}
      onPress={() => selectPlayer(item)}
      bg={item.selected ? 'lightblue' : 'white'}>
      <Block flex={3}>
        <Txt>{item.name}</Txt>
      </Block>
      <Block flex={1}>
        <Txt>{item.team}</Txt>
      </Block>
      <Block flex={1}>
        <Txt>{item.credit}</Txt>
      </Block>
    </TouchableBlock>
  );

  return (
    <Block flex={1}>
      {/* Total Count */}
      <Block
        p={12}
        bg={batsmanCount + bowlerCount < 5 ? 'lightgrey' : 'lightgreen'}>
        <Txt center>Player {batsmanCount + bowlerCount}/5</Txt>
      </Block>

      {/* Navigator Tabs */}
      <Block row border={1} p={10}>
        <TouchableBlock flex={0.3} onPress={() => selectTab('bat')}>
          <Txt>Bat ({batsmanCount})</Txt>
        </TouchableBlock>
        <TouchableBlock flex={0.3} onPress={() => selectTab('bowl')}>
          <Txt>Bowl ({bowlerCount})</Txt>
        </TouchableBlock>
      </Block>

      {/* Headers */}
      <Block row pv={10} ph={5}>
        <Block flex={3}>
          <Txt>Choose 3-5 batsmen</Txt>
        </Block>

        <Block flex={1}>
          <Txt>Team</Txt>
        </Block>
        <Block flex={1}>
          <Txt>Credit</Txt>
        </Block>
      </Block>

      {/* List */}
      <Block>
        <FlatList
          data={selectedTab === 'bat' ? batsmanList : bowlerList}
          renderItem={({ item, index }) => renderListItem(item, index)}
          keyExtractor={item => item.id}
        />
      </Block>

      {/* Submit */}
      <TouchableBlock
        disabled={batsmanCount + bowlerCount < 5}
        absolute
        bg={batsmanCount + bowlerCount < 5 ? 'lightgrey' : 'lightgreen'}
        absBottom={10}
        border={1}
        pv={20}
        ph={40}
        absRight={10}
        onPress={submit}>
        <Txt>Submit</Txt>
      </TouchableBlock>
    </Block>
  );
};

export default TeamSelector;
