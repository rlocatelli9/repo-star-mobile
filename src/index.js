import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import './config/ReactotronConfig';

import Routes from './routes';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
