import React, { Component } from 'react';
import { Text, View, SafeAreaView, Dimensions } from 'react-native';
import Block from '../components/Block';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Ellipse,
  Stop,
  ClipPath,
  G,
  Rect,
} from 'react-native-svg';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export class DoneList extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Block flex={1} border={1}>
          <Svg width={WIDTH} height={HEIGHT}>
            <Defs>
              <ClipPath id="tv">
                <Path
                  d={`m 0 ${HEIGHT / 2}, C ${WIDTH / 2} ${HEIGHT / 2}, 
                ${WIDTH / 2} ${HEIGHT / 2 + 100}, 
                ${WIDTH} ${HEIGHT / 2 + 50},
                l 0 ${-HEIGHT / 2 - 50},l ${-WIDTH} 0 z`}
                />
              </ClipPath>
            </Defs>
            <Path
              d={`m 0 ${HEIGHT / 2}, 
                C ${WIDTH / 2} ${HEIGHT / 2}, 
                ${WIDTH / 2} ${HEIGHT / 2 + 100}, 
                ${WIDTH} ${HEIGHT / 2 + 50},
                l 0 ${-HEIGHT / 2 - 50},l ${-WIDTH} 0 z`}
              stroke="red"
              strokeWidth={5}
              id="noob"
            />
            <Rect
              height={600}
              width={WIDTH}
              fill="lightblue"
              clipPath="url(#tv)"
            />
          </Svg>
        </Block>
      </SafeAreaView>
    );
  }
}

export default DoneList;
