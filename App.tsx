import React, {useState} from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {SearchBar} from './src/components/SearchBar';
import FlashMessage from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Group} from './src/components/screens/GroupScreen/Group';
import {UsersScreen} from './src/components/screens/UsersScreen';
import {PersonScreen} from './src/components/screens/PersonScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WHITE, BONDI_BLUE, IRIS_BLUE, TEAL, GORSE} from './src/utils/colors';
import {GroupScreen} from './src/components/screens/GroupScreen/GroupScreen';
import {ListOfUsers} from './src/components/screens/GroupScreen/ListOfUsers';
import {CreateGroup} from './src/components/screens/GroupScreen/CreateGroup/CreateGroup';
import {CreateAndEditScreen} from './src/components/screens/CreateAndEditScreen/CreateAndEditScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const GroupStack = createStackNavigator();

export default function App() {
  const {header, searchArea, searchAreaActive, formWrap} = styles;

  const [openInput, setOpenInput] = useState<boolean>(false);

  //Buttons onPress handler
  const openInputHandler = () => setOpenInput(!openInput);
  const openSearchForm = () => {
    return (
      <View style={formWrap}>
        {openInput ? <SearchBar /> : null}
        <TouchableOpacity
          style={openInput ? searchAreaActive : searchArea}
          onPress={openInputHandler}>
          <Icon name="search" size={openInput ? 14 : 18} color={WHITE} />
        </TouchableOpacity>
      </View>
    );
  };

  const GroupStackScreen = () => (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="Groups"
        component={GroupScreen}
        options={{
          title: 'Groups',
          headerStyle: header,
          headerTintColor: WHITE,
        }}
      />
      <GroupStack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          title: 'Create group',
          headerStyle: header,
          headerTintColor: WHITE,
        }}
      />
      <GroupStack.Screen
        name="ListUsers"
        component={ListOfUsers}
        options={{
          title: 'List of users',
          headerStyle: header,
          headerTintColor: WHITE,
        }}
      />
      <GroupStack.Screen
        name="Group"
        component={Group}
        options={{
          title: 'Group',
          headerStyle: header,
          headerTintColor: WHITE,
        }}
      />
    </GroupStack.Navigator>
  );

  const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={UsersScreen}
        options={{
          title: 'Users',
          headerTintColor: WHITE,
          headerStyle: header,
          headerRight: openSearchForm,
        }}
      />
      <HomeStack.Screen
        name="Person"
        component={PersonScreen}
        options={{
          title: 'Person Room',
          headerTintColor: WHITE,
          headerStyle: header,
        }}
      />
      <HomeStack.Screen
        name="Management"
        component={CreateAndEditScreen}
        options={{
          title: 'User management',
          headerTintColor: WHITE,
          headerStyle: header,
        }}
      />
    </HomeStack.Navigator>
  );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Groups') {
                iconName = 'users';
              }
              return (
                iconName &&
                route.name && <Icon name={iconName} size={20} color={color} />
              );
            },
          })}
          tabBarOptions={{
            inactiveBackgroundColor: IRIS_BLUE,
            activeBackgroundColor: IRIS_BLUE,
            activeTintColor: GORSE,
            inactiveTintColor: WHITE,
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Groups" component={GroupStackScreen} />
        </Tab.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: IRIS_BLUE,
  },
  searchArea: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BONDI_BLUE,
  },
  searchAreaActive: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEAL,
  },
  formWrap: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
