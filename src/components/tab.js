import React from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import theme from '../config/theme';
import {Icon} from 'react-native-elements';

function Tab() {
  return (
    <View style={styles.bg}>
      <TouchableOpacity style={styles.section}>
        <Icon name="bars" type="antdesign" color={theme.one} />
      </TouchableOpacity>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.createIcon}
          onPress={() => ToastAndroid.show('pressed', ToastAndroid.SHORT)}>
          <Icon name="plus" type="antdesign" size={40} color={theme.one} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.section}>
        <Icon name="check" type="foundation" color="green" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: 50,
    elevation: 1,
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createIcon: {
    position: 'absolute',
    padding: 10,
    bottom: 10,
    backgroundColor: 'whitesmoke',
    elevation: 3,
    borderRadius: 50,
  },
});

export default Tab;
