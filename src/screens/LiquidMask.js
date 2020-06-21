/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import Block from '../components/Block';
import Svg, { Path, Defs, ClipPath, Image } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent, withOffset } from 'react-native-redash';
import Animated, {
  interpolate,
  concat,
  add,
  Extrapolate,
  sub,
  abs,
  divide,
  cond,
  lessThan,
  greaterThan,
} from 'react-native-reanimated';
import Theme from '../config/Theme';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const { Value, View, createAnimatedComponent } = Animated;
const AnimatedPath = createAnimatedComponent(Path);

const DoneList = () => {
  const state = new Value(State.UNDETERMINED);
  const translationY = new Value(0);
  const translationX = new Value(0);
  const gestureHandler = onGestureEvent({ state, translationY, translationX });
  const translateY = withOffset(translationY, state);
  const translateX = withOffset(translationX, state);
  const rangeY = [-100, 0, 100];
  const rangeX = [-100, 0, 100];
  let dy = interpolate(translateY, {
    inputRange: rangeY,
    outputRange: rangeY,
  });
  let dx = interpolate(translateX, {
    inputRange: rangeX,
    outputRange: rangeX,
    extrapolate: Extrapolate.CLAMP,
  });

  const path = concat(
    'm 0 ',
    add(add(HEIGHT / 2 + 200, dy), dx),
    ' C ',
    add(WIDTH / 2, cond(lessThan(dx, 0), dx, 0)),
    ' ',
    add(add(HEIGHT / 2 + 150, dy), dx),
    ' ',
    add(WIDTH / 2, cond(greaterThan(dx, 0), dx, 0)),
    ' ',
    sub(add(HEIGHT / 2 + 150, dy), dx),
    ' ',
    WIDTH,
    ' ',
    sub(add(HEIGHT / 2 + 200, dy), dx),
    ' L ',
    WIDTH,
    ' 0 ',
    ' l ',
    -WIDTH,
    ' 0 z',
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Block flex={1}>
        <Svg width={WIDTH} height={HEIGHT} preserveAspectRatio="xMinYMin slice">
          <Defs>
            <ClipPath id="tv">
              <AnimatedPath d={path} />
            </ClipPath>
          </Defs>
          <Image
            width={WIDTH}
            height={HEIGHT}
            preserveAspectRatio="xMidYMid slice"
            href={require('../../assets/images/bg_2.jpg')}
          />
          <AnimatedPath d={path} strokeWidth={5} id="noob" />

          <Image
            clipPath="url(#tv)"
            width={WIDTH}
            height={HEIGHT}
            preserveAspectRatio="xMidYMid slice"
            href={require('../../assets/images/bg_1.jpg')}
          />
        </Svg>
      </Block>

      {/* Abosolute block */}
      <PanGestureHandler {...gestureHandler}>
        <View
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderWidth: 5,
            borderColor: 'white',
            borderRadius: 30,
            top: HEIGHT / 2 + 200,
            left: WIDTH / 2 - 25,
            transform: [{ translateY, translateX }],
          }}
        />
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default DoneList;
