import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {GroupList} from './GroupList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BLACK, EGYPTIAN_BLUE, GREY} from '../../../utils/colors';
import {InitialStateGroupReducerType} from '../../../redux/group-reducer';
import {getGroupTC, removeGroupTC} from '../../../redux/thunks/group-thunk';
import {SwipeListView} from 'react-native-swipe-list-view';
import {InitialAppStateType} from '../../../redux/app-reducer';
import {setSearchBarValueAC, setSuccessAC} from '../../../redux/actions';
import {showMessage} from 'react-native-flash-message';
import Loading from '../../../utils/loadingUtils';

export const GroupScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    text,
    input,
    rowEdit,
    container,
    rowDelete,
    backBtnView,
    addGroupTouch,
  } = styles;

  const {filterValue, isLoading, isSuccess} = useSelector<
    AppRootStateType,
    InitialAppStateType
  >(state => state.appStore);

  const {groups} = useSelector<AppRootStateType, InitialStateGroupReducerType>(
    state => state.groupStore,
  );

  useEffect(() => {
    dispatch(getGroupTC());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      showMessage({
        type: 'success',
        message: 'Success',
      });
    }
    dispatch(setSuccessAC(false));
  }, [dispatch, isSuccess]);

  //Buttons onPress handler
  const handleAdGroup = () => navigation.navigate('CreateGroup');

  const onSearchHandle = (value: string) =>
    dispatch(setSearchBarValueAC(value));

  const filteredGroup = groups.filter(group =>
    group.title.toLowerCase().includes(filterValue.toLowerCase()),
  );

  const groupsData = filterValue ? filteredGroup : groups;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={container}>
      <TextInput
        placeholder="Search..."
        style={input}
        onChangeText={onSearchHandle}
        placeholderTextColor={'#fff'}
      />

      <SwipeListView
        data={groupsData}
        renderItem={data => <GroupList group={data.item} />}
        renderHiddenItem={data => (
          <View style={backBtnView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateGroup', {group: data.item})
              }
              style={rowEdit}>
              <Icon name="edit" size={20} color={'#fff'} />
              <Text style={text}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(removeGroupTC(data.item.id))}
              style={rowDelete}>
              <Icon name="trash" size={20} color={'#fff'} />
              <Text style={text}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
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
    flexDirection: 'column',
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
  rowEdit: {
    width: 75,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  backBtnView: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: BLACK,
  },
  rowDelete: {
    width: 75,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
  },
  input: {
    paddingLeft: 10,
    color: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#fff',
  },
  toast: {
    zIndex: 1,
  },
});
