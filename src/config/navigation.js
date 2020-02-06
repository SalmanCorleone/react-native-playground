import React from 'react';
import TaskList from '../screens/TaskList';
import DoneList from '../screens/DoneList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppWithNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="Tasks" component={TaskList} options={} />
    <Tab.Screen name="Completed" component={DoneList} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppWithNavigation />
  </NavigationContainer>
);

export default App;
