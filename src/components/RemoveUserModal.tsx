import React from 'react';
import {useDispatch} from 'react-redux';
import {removeNewUserAC} from '../redux/actions';
import {useNavigation} from '@react-navigation/native';
import {removeUsersAsyncStorageTC} from '../redux/thunks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type PropsRemoveModalType = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  id: number;
};

export const RemoveUserModal = (props: PropsRemoveModalType) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {modalVisible, setModalVisible, id} = props;
  const {centeredView, modalView, modalText, btnArea, touchableArea} = styles;
  const closeModalBtn = () => setModalVisible(false);

  const deleteUserBtn = () => {
    dispatch(removeNewUserAC(id));
    dispatch(removeUsersAsyncStorageTC(id));
    setModalVisible(false);
    navigation.navigate('Users');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={centeredView}>
        <View style={modalView}>
          <Text style={modalText}>Do you want to delete the user?</Text>
          <View style={btnArea}>
            <TouchableOpacity style={touchableArea} onPress={closeModalBtn}>
              <Icon name="times" size={30} color="#000000" />
            </TouchableOpacity>

            <TouchableOpacity style={touchableArea} onPress={deleteUserBtn}>
              <Icon name="check" size={30} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableArea: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    padding: 35,
    borderRadius: 20,
    shadowColor: '#000',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btnArea: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
