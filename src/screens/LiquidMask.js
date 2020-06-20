import React from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import Block from '../components/Block';
import Svg, { Path, Defs, ClipPath, Image } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent, withOffset } from 'react-native-redash';
import Icon from 'react-native-vector-icons/dist/Feather';
import Animated, {
  interpolate,
  concat,
  add,
  Extrapolate,
  sub,
} from 'react-native-reanimated';

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
    add(add(HEIGHT / 2, dy), dx),
    ' C ',
    add(WIDTH / 2, dx),
    ' ',
    add(HEIGHT / 2, dy),
    ' ',
    add(WIDTH / 2, dx),
    ' ',
    sub(add(HEIGHT / 2 + 100, dy), dx),
    ' ',
    WIDTH,
    ' ',
    add(HEIGHT / 2 + 50, dy),
    ' L ',
    WIDTH,
    ' 0 ',
    ' l ',
    -WIDTH,
    ' 0 z',
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Block flex={1} border={1}>
        <Svg width={WIDTH} height={HEIGHT}>
          <Defs>
            <ClipPath id="tv">
              <AnimatedPath d={path} />
            </ClipPath>
          </Defs>
          <Image
            x="5%"
            y="40%"
            width={300}
            height={300}
            preserveAspectRatio="xMidYMid"
            href={require('../../assets/images/red-twitter.png')}
          />
          <AnimatedPath d={path} fill="lightblue" strokeWidth={5} id="noob" />

          <Image
            clipPath="url(#tv)"
            x="5%"
            y="40%"
            width={300}
            height={300}
            preserveAspectRatio="xMidYMid"
            href={require('../../assets/images/blue-twitter.png')}
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
            borderWidth: 1,
            backgroundColor: 'white',
            borderWidth: 5,
            borderColor: 'lightgrey',
            borderRadius: 30,
            top: HEIGHT / 2 + 65,
            left: WIDTH / 2 - 25,
            transform: [{ translateY, translateX }],
          }}
        />
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default DoneList;
