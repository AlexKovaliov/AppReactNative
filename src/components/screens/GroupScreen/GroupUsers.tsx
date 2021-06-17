import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {NO_AVATAR} from '../../../utils/images';
import {UsersType} from '../../../api/users-api';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {removeUserFromGroupTC} from '../../../redux/thunks/group-thunk';
import {EGYPTIAN_BLUE, GREY, SOLITUDE, WHITE} from '../../../utils/colors';

type PropsGroupUsersType = {
  groupUser: UsersType;
  groupId: number;
};

export const GroupUsers = (props: PropsGroupUsersType) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {avatar, first_name, last_name, id} = props.groupUser;
  const {cardView, image, text, touch, removeText, container} = styles2;

  //Buttons onPress handler
  const onNavigation = () =>
    navigation.navigate('Person', {user: props.groupUser});
  const onRemoveMember = () => {
    dispatch(removeUserFromGroupTC(id, props.groupId));
    //navigation.setParams()
  };

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        <View style={cardView}>
          <TouchableOpacity style={image} onPress={onNavigation}>
            <Image style={image} source={{uri: avatar || NO_AVATAR}} />
          </TouchableOpacity>
          <Text style={text}>
            {first_name} {last_name}
          </Text>
          <TouchableOpacity style={touch} onPress={onRemoveMember}>
            <Icon name="folder-minus" size={20} color={GREY} />
            <Text style={removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: EGYPTIAN_BLUE,
  },
  image: {
    height: 110,
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
  cardView: {
    flex: 1,
    width: 150,
    height: 220,
    borderRadius: 4,
    marginVertical: 4,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: SOLITUDE,
    justifyContent: 'space-between',
  },
  touch: {
    width: '90%',
    marginBottom: 5,
    borderRadius: 4,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: WHITE,
    justifyContent: 'space-around',
  },
  removeText: {
    fontSize: 16,
    color: GREY,
    fontWeight: '400',
  },
});
