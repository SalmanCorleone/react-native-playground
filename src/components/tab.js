import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import theme from '../config/Theme';
import { Icon } from 'react-native-elements';
import Animated, { Easing, useCode, not } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import {
  mix,
  onGestureEvent,
  withTransition,
  useTransition,
} from 'react-native-redash';

const WIDTH = Dimensions.get('window').width;

const {
  Value,
  eq,
  cond,
  interpolate,
  block,
  clockRunning,
  Clock,
  set,
  startClock,
  timing,
  debug,
  stopClock,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 200,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

function Tab({ toggleModal, nav }) {
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state });
  // const clock = new Clock();
  const progress = new Value(0);
  const transition = useTransition(progress, { duration: 200 });
  // progress = cond(eq(state, State.END), runTiming(clock, 0, 1));

  useCode(() => cond(eq(state, State.END), set(progress, not(progress))));

  let translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, -WIDTH / 2],
  });

  let opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [1, 0.2],
  });

  let scale = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  return (
    <>
      <View style={styles.bg}>
        <TouchableOpacity
          style={styles.section}
          onPress={() => nav.push('Tasks')}>
          <Icon name="bars" type="antdesign" color={theme.blueGreen} />
        </TouchableOpacity>

        <View style={styles.section} />

        <TouchableOpacity
          style={styles.section}
          onPress={() => nav.push('Completed')}>
          <Icon name="check" type="foundation" color={theme.blueGreen} />
        </TouchableOpacity>
      </View>

      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.createIcon,
            { opacity, transform: [{ translateY }, { scale }] },
          ]}
          onPress={toggleModal}>
          <Icon name="plus" type="antdesign" size={40} color={theme.blue} />
        </Animated.View>
      </TapGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
    borderTopWidth: 1,
    borderColor: theme.blueGreen,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createIcon: {
    position: 'absolute',
    padding: 20,
    flex: 1,
    bottom: 10,
    zIndex: 999,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 50,
  },
});

export default Tab;
