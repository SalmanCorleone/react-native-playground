import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import utils from '../utils';
import { Input, Icon, Button } from 'react-native-elements';
import theme from '../config/Theme';
import Tab from '../components/Tab';
import CustomModal from '../components/Modal';
import SwipeCard from '../components/SwipeCard';
import { useNavigation } from '@react-navigation/native';
import Block from '../components/Block';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  not,
  Value,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import {
  onGestureEvent,
  withTransition,
  withSpringTransition,
  withTimingTransition,
} from 'react-native-redash';

const WIDTH = Dimensions.get('window').width;

function TaskList() {
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showModal, setModal] = useState(false);

  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state });
  const progress = new Value(0);
  const transition = withTimingTransition(progress, {
    duration: 300,
    easing: Easing.ease,
  });

  let translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [-WIDTH - 300, 0],
  });

  let opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useCode(() => cond(eq(state, State.END), set(progress, not(progress))));

  const navigation = useNavigation();

  useEffect(() => {
    async function readFromStorage() {
      setLoading(true);
      let taskList = await utils.getData('taskList');
      setTasks(taskList);
      setLoading(false);
    }
    readFromStorage();
  }, []);

  const addTask = taskName => {
    if (!taskName) {
      return;
    }
    let updatedTasks = [...tasks, { name: taskName, date: new Date() }];
    setTasks(updatedTasks);
    utils.storeData('taskList', updatedTasks);
    setText('');
  };

  const reset = () => {
    setLoading(true);
    setTasks([]);
    utils.storeData('taskList', []);
    setLoading(false);
  };

  const toggleModal = () => setModal(!showModal);

  if (isLoading) {
    return <ActivityIndicator color={theme.two} size={100} style={styles.bg} />;
  }

  return (
    <View style={styles.bg}>
      <Block absolute w100 h100 center middle>
        <Animated.View
          style={[
            styles.createBox,
            {
              transform: [{ translateY }],
            },
          ]}>
          <Text>Jeuodas masd</Text>
          <Text>Jeuodas masd</Text>
          <Text>Jeuodas masd</Text>
          <Text>Jeuodas masd</Text>
        </Animated.View>
      </Block>
      <StatusBar backgroundColor={theme.blueGreen} />

      {/* Create Task Modal */}
      <CustomModal visible={showModal} toggle={toggleModal} />

      {/* Test Control */}
      <Block row bottom>
        <Button title="Reset" onPress={reset} />
      </Block>

      {/* Container */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Create Task */}
        <View style={styles.inputBox}>
          <Input
            value={text}
            inputStyle={styles.inputText}
            placeholder="Create a new Task"
            onChangeText={str => setText(str)}
            onSubmitEditing={({ nativeEvent }) => addTask(nativeEvent.text)}
            leftIcon={
              <Icon
                onPress={() => addTask(text)}
                name="plus"
                type="simple-line-icon"
                size={15}
                color="black"
              />
            }
          />
        </View>

        {/* Task List */}
        <View style={styles.listBox}>
          {tasks && tasks.map((task, i) => <SwipeCard task={task} key={i} />)}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View>
        <Tab
          toggleModal={toggleModal}
          nav={navigation}
          {...{ gestureHandler, transition }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inputBox: {
    paddingVertical: 30,
  },
  inputText: {
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    marginLeft: 10,
  },
  listBox: {
    padding: 10,
  },
  createBox: {
    backgroundColor: 'white',
    height: 300,
    width: WIDTH * 0.7,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
});

export default TaskList;
