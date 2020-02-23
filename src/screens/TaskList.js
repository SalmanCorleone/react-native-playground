import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import utils from '../utils';
import {Input, Icon, ThemeContext} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Theme from '../config/theme';

function TaskList() {
  const [isLaoding, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function readFromStorage() {
      setLoading(true);
      let taskList = await utils.getData('taskList');
      setTasks(taskList);
      setLoading(false);
    }
    readFromStorage();
  }, []);

  const addTask = task => {
    let updatedTasks = [...tasks, {name: task, date: new Date()}];
    utils.storeData('taskList', updatedTasks);
    setTasks(updatedTasks);
    setText('');
  };

  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar backgroundColor={Theme.one} />
      {/* Create Task */}
      <View style={styles.inputBox}>
        <Input
          value={text}
          inputStyle={styles.inputText}
          placeholder="Create a new Task"
          onChangeText={str => setText(str)}
          onSubmitEditing={({nativeEvent}) => addTask(nativeEvent.text)}
          leftIcon={
            <Icon
              onPress={() => addTask(text)}
              name="plus"
              type="simple-line-icon"
              size={15}
              color="black"
            />
          }
        />
      </View>

      {/* Task List */}
      <View style={styles.listBox}>
        <Text>{isLaoding ? 'true' : 'false'}</Text>
        {tasks.map((task, i) => (
          <Text key={i}>{task.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  inputBox: {
    paddingVertical: 30,
    backgroundColor: Theme.one,
  },
  inputText: {
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    marginLeft: 10,
  },
  listBox: {
    backgroundColor: Theme.two,
  },
});

export default TaskList;

// import React, { Component } from 'react';
// import { View, StyleSheet, Button, Text, StatusBar, LayoutAnimation, UIManager } from 'react-native';
// import Input from '../components/Input';
// import List from '../components/List';
// import { connect } from 'react-redux';
// import Theme from '../style/Theme';

// import { actionCreators } from '../reducers/todoListRedux';

// const mapStateToProps = (state) => ({
// 	done: state.done,
// 	tasks: state.tasks
// });

// class taskScreen extends Component {
// 	constructor(props) {
// 		super(props);
// 		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
// 	}

// 	onAddTodo = (text) => {
// 		const { dispatch } = this.props;
// 		dispatch(actionCreators.quickAdd(text));
// 		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
// 	};

// 	onReset = () => {
// 		const { dispatch } = this.props;
// 		dispatch(actionCreators.reset());
// 	};

// 	render() {
// 		const { tasks } = this.props;

// 		return (
// 			<View style={styles.back}>
// 				<StatusBar backgroundColor={Theme.Primary_Color} barStyle="light-content" />
// 				<Text style={{ margin: 20, color: 'whitesmoke' }}>[Debug Console]</Text>
// 				<Input placeholder={'Enter Quick Task'} onSubmitEditing={this.onAddTodo} />
// 				<List tasks={tasks} />
// 				{/* <Button onPress={this.onReset} title="reset" /> */}
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	back: {
// 		backgroundColor: '#2c3e50',
// 		flex: 1
// 	}
// });

// export default connect(mapStateToProps)(taskScreen);

// import React, { Component } from 'react';
// import { ScrollView, ToastAndroid, View, Text, LayoutAnimation, UIManager } from 'react-native';
// import { connect } from 'react-redux';
// import Item from './Item';
// import { actionCreators } from '../reducers/todoListRedux';
// import Theme from '../style/Theme';

// var groupData = (items) => {
// 	let result = {};

// 	items.map((item) => {
// 		let date = new Date(item.date).toDateString();
// 		if (!result[date]) {
// 			result[date] = [];
// 		}
// 		result[date].push(item);
// 	});

// 	return result;
// };
// class List extends Component {
// 	constructor(props) {
// 		super(props);
// 		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
// 	}

// 	hey = (group, i) => {
// 		return (
// 			<View key={i}>
// 				<View style={{ flex: 1, marginHorizontal: 10, marginTop: 20, marginBottom: 5 }}>
// 					<Text style={{ color: Theme.Border }}>{group[0]}</Text>
// 				</View>
// 				{group[1].map(this.renderItem)}
// 			</View>
// 		);
// 	};

// 	renderItem = (item, i) => {
// 		return <Item key={item.id} item={item} id={i} onDone={this.onDone} onRemove={this.onRemove} />;
// 	};

// 	onRemove = (item) => {
// 		const { dispatch } = this.props;
// 		dispatch(actionCreators.remove(item));
// 		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
// 		ToastAndroid.show('Task Deleted!', ToastAndroid.SHORT);
// 	};
// 	onDone = (item) => {
// 		const { dispatch } = this.props;
// 		dispatch(actionCreators.done(item));
// 		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
// 		ToastAndroid.show('Task Completed!', ToastAndroid.SHORT);
// 	};

// 	render() {
// 		const { tasks } = this.props;
// 		var groupedByDate = groupData(tasks);

// 		/********RENDER*********/

// 		if (tasks === undefined || tasks.length == 0) {
// 			return null;
// 		} else {
// 			return (
// 				<ScrollView>
// 					{/* <Text style={{ color: 'whitesmoke' }}>{JSON.stringify(groupedByDate)}</Text> */}
// 					{Object.entries(groupedByDate).map(this.hey)}
// 				</ScrollView>
// 			);
// 		}
// 	}
// }

// export default connect()(List);
