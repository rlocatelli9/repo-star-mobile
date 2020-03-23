import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: '#7159c1'},
        headerTintColor: '#fff',
      }}
      initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{title: 'Dashboard'}}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={({route}) => ({title: route.params.user.name})}
      />
      <Stack.Screen
        name="Repository"
        component={Repository}
        options={({route}) => ({
          title: route.params.repository.full_name,
          headerTitleStyle: {marginLeft: 30, marginRight: 30},
        })}
      />
    </Stack.Navigator>
  );
}
