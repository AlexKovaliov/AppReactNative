import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from '../utils/avatarUtils';
import {UsersType} from '../api/users-api';

export type PropsType = {
  user: UsersType;
};

export const UsersList = React.memo(({...props}: PropsType) => {
  const navigation = useNavigation();
  const onNavigation = () => navigation.navigate('Person', {id: props.user.id});

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrap} onPress={onNavigation}>
        <Avatar avatar={props.user.avatar} />
        <View>
          <Text style={styles.text}>
            {props.user.first_name} {props.user.last_name}
          </Text>
          <Text style={styles.email}>Email: {props.user.email}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    backgroundColor: '#f1f3f6',
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '400',
  },
  email: {
    fontSize: 14,
    marginLeft: 10,
  },
});
