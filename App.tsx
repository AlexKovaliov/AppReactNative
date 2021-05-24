import React from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import {ModalScreen} from './src/components/screens/ModalScreen/CreateUserModal';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UsersScreen} from './src/components/screens/UsersScreen';
import {PersonScreen} from './src/components/screens/PersonScreen';
import { ModalForm } from "./src/components/screens/ModalScreen/ModalForm";

const Stack = createStackNavigator();

export default function App() {
  const {header} = styles;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Users">
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{
              title: 'Users',
              headerTintColor: '#fff',
              headerStyle: header,
            }}
          />

          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              title: 'Person Room',
              headerTintColor: '#fff',
              headerStyle: header,
            }}
          />

          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{
              title: 'Create user',
              headerTintColor: '#fff',
              headerStyle: header,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3949ab',
  },
});
