import React, {useState} from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UsersScreen} from './src/components/screens/UsersScreen';
import {PersonScreen} from './src/components/screens/PersonScreen';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ModalScreen} from './src/components/screens/ModalScreen/CreateUserModal';
import {
  WHITE,
  TORY_BLUE,
  CERULEAN_BLUE,
  EGYPTIAN_BLUE,
} from './src/utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SearchForm} from './src/components/SearchForm';

const Stack = createStackNavigator();

export default function App() {
  const {header, searchArea, searchAreaActive, formWrap} = styles;
  const [openInput, setOpenInput] = useState<boolean>(false);
  const openInputHandler = () => setOpenInput(!openInput);
  const openSearchForm = () => {
    return (
      <View style={formWrap}>
        {openInput ? <SearchForm /> : null}
        <TouchableOpacity
          style={openInput ? searchAreaActive : searchArea}
          onPress={openInputHandler}>
          <Icon name="search" size={18} color={WHITE} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Users">
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{
              title: 'Users',
              headerTintColor: WHITE,
              headerStyle: header,
              headerRight: openSearchForm,
            }}
          />

          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{
              title: 'Person Room',
              headerTintColor: WHITE,
              headerStyle: header,
            }}
          />

          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{
              title: 'Create user',
              headerTintColor: WHITE,
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
    backgroundColor: CERULEAN_BLUE,
  },
  searchArea: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TORY_BLUE,
  },
  searchAreaActive: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EGYPTIAN_BLUE,
  },
  formWrap: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
