import React from 'react';
import { Text } from 'react-native';
import Theme from '../config/Theme';

const strikeProps = {
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
};

const Txt = ({
  txt,
  bold,
  light,
  semi,
  size,
  color,
  center,
  right,
  underline,
  strike,
  mv,
  mt,
  mb,
  ml,
  mr,
  numberOfLines,
  style,
  children,
}) => (
  <Text
    numberOfLines={numberOfLines || null}
    allowFontScaling={false}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      color: color || Theme.black,
      fontSize: size || 15,
      textAlign: center ? 'center' : right ? 'right' : 'left',
      textDecorationLine: underline ? 'underline' : 'none',
      marginVertical: mv || null,
      marginTop: mt || null,
      marginBottom: mb || null,
      marginLeft: ml || null,
      marginRight: mr || null,
      ...(strike ? strikeProps : null),
      ...style,
    }}>
    {txt}
    {children}
  </Text>
);

export default Txt;
