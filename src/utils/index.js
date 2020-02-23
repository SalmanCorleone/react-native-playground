import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

let storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    ToastAndroid.show('Failed to save task', ToastAndroid.SHORT);
  }
};

let getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    ToastAndroid.show('Failed to read task', ToastAndroid.SHORT);
  }
};

let removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    ToastAndroid.show('Failed to remove task', ToastAndroid.SHORT);
  }
};

export default {storeData, getData, removeData};
