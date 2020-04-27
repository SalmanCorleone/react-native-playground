import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './src/config/Navigation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
