import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import theme from '../config/Theme';
import { Icon } from 'react-native-elements';
import Animated, { Easing, useCode, not } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import {
  mix,
  onGestureEvent,
  withTransition,
  useTransition,
  withSpringTransition,
} from 'react-native-redash';
import Block from './Block';

const WIDTH = Dimensions.get('window').width;
const ICON_SIZE = 80;

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

function Tab({ toggleModal, nav, gestureHandler, transition }) {
  let translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, -WIDTH / 2 - 150 - 20 - ICON_SIZE * 0.7],
  });

  let rotation = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, Math.PI / 4],
  });

  let scale = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [1, 0.5],
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
            { transform: [{ translateY }, { scale }] },
          ]}
          onPress={toggleModal}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Icon name="plus" type="antdesign" size={40} color={theme.blue} />
          </Animated.View>
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
    width: ICON_SIZE,
    height: 80,
    flex: 1,
    bottom: 10,
    zIndex: 999,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 90,
  },
});

export default Tab;
