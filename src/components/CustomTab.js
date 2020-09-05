import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomTab = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View>
      {/* Title */}
      {children.map((item, i) => (
        <TouchableOpacity onPress={() => setSelectedTab(i)} key={i}>
          {item.props.title}
        </TouchableOpacity>
      ))}
      {/* content */}
      {children[selectedTab]}
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({});
