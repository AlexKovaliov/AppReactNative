import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NewUserType} from './screens/UsersScreen';

export type PropsType = {
  user: NewUserType;
};

export const UsersList = React.memo(({...props}: PropsType) => {
  const navigation = useNavigation();

  const onNavigation = () => navigation.navigate('Person', {id: props.user.id});

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrap} onPress={onNavigation}>
        <Image
          style={styles.image}
          source={{
            // props.user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFe6oKnt1B1FMzZEeMgRWWrsBiqeSRGaCLdA&usqp=CAU'
            // и такую строку лучше выносить в отдельный файл в константы
            uri: props.user.avatar
              ? props.user.avatar
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFe6oKnt1B1FMzZEeMgRWWrsBiqeSRGaCLdA&usqp=CAU',
          }}
        />
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
  image: {
    borderRadius: 100,
    height: 50,
    width: 50,
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
