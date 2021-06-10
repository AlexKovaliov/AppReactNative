import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {GroupList} from './GroupList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import {GroupType} from './CreateGroup/ValidationGroup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {EGYPTIAN_BLUE, GREY} from '../../../utils/colors';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';
import {getGroupTC} from '../../../redux/thunks/group-thunk';

export const GroupScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {container, addGroupTouch} = styles;

  useEffect(() => {
    dispatch(getGroupTC());
  }, [dispatch]);

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  //Buttons onPress handler
  const handleAdGroup = () => navigation.navigate('CreateGroup');

  return (
    <SafeAreaView style={container}>
      <FlatList
        data={groups}
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
