/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello World!</Text>
    </View>
  );
}
import { AppRegistry } from 'react-native';
import App from './App';  // Adjust the path if your App component is in a different location
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);