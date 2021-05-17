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
  email: {
    fontSize: 14,
    marginLeft: 10,
  },
});
