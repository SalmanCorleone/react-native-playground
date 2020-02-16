import React from 'react';
import TaskList from '../screens/TaskList';
import DoneList from '../screens/DoneList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

const AppWithNavigation = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Tasks') {
          iconName = focused ? 'pluscircle' : 'pluscircleo';
        } else if (route.name === 'Completed') {
          iconName = focused ? 'pluscircle' : 'pluscircleo';
        }

        return (
          <Icon type="antdesign" name={iconName} size={size} color={color} />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Tasks" component={TaskList} />
    <Tab.Screen name="Completed" component={DoneList} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppWithNavigation />
  </NavigationContainer>
);

export default App;
