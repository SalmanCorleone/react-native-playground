import React from 'react';
import TaskList from '../screens/TaskList';
import DoneList from '../screens/DoneList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

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
