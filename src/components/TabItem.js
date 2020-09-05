import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const TabItem = ({ children, title }) => {
  return <View>{children}</View>;
};

export default TabItem;

const styles = StyleSheet.create({});

// <Tab>
//   <TabItem title="dsadsad" >dasdasd</TabItem>
//   <TabItem title="dsadsad" >dasdasd</TabItem>
//   <TabItem title="dsadsad" >dasdasd</TabItem>
//   <TabItem title="dsadsad" >dasdasd</TabItem>
// </Tab>
