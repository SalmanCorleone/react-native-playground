import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../config/Theme';
import { Icon } from 'react-native-elements';

function Tab({ toggleModal, nav }) {
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

      <TouchableOpacity style={styles.createIcon} onPress={toggleModal}>
        <Icon name="plus" type="antdesign" size={40} color={theme.blue} />
      </TouchableOpacity>
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
