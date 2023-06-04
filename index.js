/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { spyOnMessageQueue } from './src/MessageQueueSpy';

LogBox.ignoreAllLogs(true);
spyOnMessageQueue();

AppRegistry.registerComponent(appName, () => App);
