import React from 'react';
import TaskList from '../screens/TaskList';
import DoneList from '../screens/DoneList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import Theme from './theme';

// const Tab = createBottomTabNavigator();
const Main = createStackNavigator();

const AppWithNavigation = () => (
  <Main.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Main.Screen name="Tasks" component={TaskList} />
    <Main.Screen name="Completed" component={DoneList} />
  </Main.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppWithNavigation />
  </NavigationContainer>
);

export default App;
