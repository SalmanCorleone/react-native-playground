import React from 'react';
import TaskList from '../screens/TaskList';
import Home from '../screens/Home';
import LiquidMask from '../screens/LiquidMask';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Main = createStackNavigator();

const AppWithNavigation = () => (
  <Main.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Main.Screen name="LiquidMask" component={LiquidMask} />
    <Main.Screen name="Home" component={Home} />
    <Main.Screen name="Tasks" component={TaskList} />
  </Main.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppWithNavigation />
  </NavigationContainer>
);

export default App;
