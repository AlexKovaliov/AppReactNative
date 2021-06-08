import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {GroupList} from './GroupList';
import {useSelector} from 'react-redux';
import {GroupType} from './ValidationGroup';
import {AppRootStateType} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {EGYPTIAN_BLUE, GREY} from '../../../utils/colors';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';

export const GroupScreen = React.memo(() => {
  const navigation = useNavigation();
  const {container, addGroupTouch} = styles;

  const {group} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  //Buttons onPress handler
  const handleAdGroup = () => navigation.navigate('CreateGroup');

  return (
    <SafeAreaView style={container}>
      <FlatList
        data={group}
        keyExtractor={(item: GroupType) => String(item.id)}
        renderItem={({item}) => <GroupList group={item} />}
      />
      <TouchableOpacity style={addGroupTouch} onPress={handleAdGroup}>
        <Icon name="plus" size={20} color={'#000'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: EGYPTIAN_BLUE,
    justifyContent: 'space-around',
  },
  addGroupTouch: {
    right: 20,
    width: 55,
    height: 55,
    bottom: 25,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREY,
  },
});
