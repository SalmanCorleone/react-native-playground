import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

const CustomModal = ({visible, toggle}) => {
  return (
    <Modal
      visible={visible}
      presentationStyle="overFullScreen"
      onRequestClose={toggle}
      transparent
      animationType="fade">
      <TouchableWithoutFeedback onPress={toggle}>
        <View style={styles.bg} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <View style={{height: 20, marginBottom: 20}}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', padding: 10}}
            onPress={toggle}>
            <Text style={{fontSize: 20, color: 'red'}}>x</Text>
          </TouchableOpacity>

          <View>
            <Text>Enter Task</Text>
            <DatePicker
              style={{width: 200, fontFamily: 'SairaSemiCondensed-Regular'}}
              date={new Date()}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  opacity: 0,
                },
                dateInput: {
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
            />
            <Text>Hello World!</Text>
            <Text>Hello World!</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: '10%',
    marginVertical: '30%',
  },
});
