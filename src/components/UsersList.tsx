import React from 'react';
import {UsersType} from '../api/users-api';
import {Avatar} from '../utils/avatarUtils';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export type PropsType = {
  user: UsersType;
};

export const UsersList = React.memo(({...props}: PropsType) => {
  const navigation = useNavigation();
  const {container, wrap, text, emailSt} = styles;
  const {avatar, first_name, last_name, email} = props.user;
  const onNavigation = () => navigation.navigate('Person', {user: props.user});

  return (
    <View style={container}>
      <TouchableOpacity style={wrap} onPress={onNavigation}>
        <Avatar avatar={avatar} />
        <View>
          <Text style={text}>
            {first_name} {last_name}
          </Text>
          <Text style={emailSt}>Email: {email}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  wrap: {
    flex: 1,
    borderRadius: 4,
    marginVertical: 4,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#f1f3f6',
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '400',
  },
  emailSt: {
    fontSize: 14,
    marginLeft: 10,
  },
});
