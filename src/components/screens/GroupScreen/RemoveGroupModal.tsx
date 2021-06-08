import React from 'react';
import {useDispatch} from 'react-redux';
import {BLACK, WHITE} from '../../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {removeGroupTC} from '../../../redux/thunks/group-thunk';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type PropsRemoveModalType = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  id: number;
};

export const RemoveGroupModal = (props: PropsRemoveModalType) => {
  const dispatch = useDispatch();
  const {modalVisible, setModalVisible, id} = props;
  const {centeredView, modalView, modalText, btnArea, touchableArea} = styles;

  //Buttons onPress handler
  const closeModalHandler = () => setModalVisible(false);
  const modalVisibleHandler = () => setModalVisible(!modalVisible);
  const deleteUserHandler = () => {
    dispatch(removeGroupTC(id));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={modalVisibleHandler}>
      <View style={centeredView}>
        <View style={modalView}>
          <Text style={modalText}>Do you want to delete this group?</Text>
          <View style={btnArea}>
            <TouchableOpacity style={touchableArea} onPress={closeModalHandler}>
              <Icon name="times" size={30} color={BLACK} />
            </TouchableOpacity>

            <TouchableOpacity style={touchableArea} onPress={deleteUserHandler}>
              <Icon name="check" size={30} color={BLACK} />
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
    shadowColor: BLACK,
    alignItems: 'center',
    backgroundColor: WHITE,
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
