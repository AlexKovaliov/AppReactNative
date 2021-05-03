import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {PersonScreen} from './src/components/screens/PersonScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {UsersScreen} from './src/components/screens/UsersScreen';
import {ModalScreen} from './src/components/CreateUserModal';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Users">
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{
              title: 'Users',
              headerStyle: styles.header,
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              title: 'Person Room',
              headerStyle: styles.header,
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{
              title: 'Create user',
              headerStyle: styles.header,
              headerTintColor: '#fff',
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
