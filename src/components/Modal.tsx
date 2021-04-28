import React, {FC, useCallback} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';

// используй модалку из реакт навигейшн
type PropsType = {
  modalVisible: boolean;
  addReview: (newUser: NewUserType) => void;
  setModalVisible: (modalVisible: boolean) => void;
};

type NewUserType = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  avatar: string | null;
};

//мемо не обязательно везде использовать
export const ModalAddUser: FC<PropsType> = React.memo(
  ({modalVisible, setModalVisible, addReview}) => {
    const closeModal = useCallback(() => {
      setModalVisible(false);
    }, [setModalVisible]);

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AddUserForm addReview={addReview} closeModal={closeModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 3,
    marginVertical: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

type AddUserFormType = {
  addReview: (newUser: NewUserType) => void;
  closeModal: () => void;
};
//добавить лодер на время загрузки и валидацию
export const AddUserForm = React.memo(
  ({addReview, closeModal}: AddUserFormType) => {
    return (
      <View>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            avatar: '' || null,
            id: '',
          }}
          onSubmit={(values, actions) => {
            //а если ошибка будет а данные уже резетнули?
            actions.resetForm();
            addReview(values);
          }}>
          {props => (
            <View style={styles2.container}>
              <TextInput
                multiline
                style={styles2.input}
                placeholder="First Name"
                onChangeText={props.handleChange('first_name')}
                value={props.values.first_name}
              />
              <TextInput
                style={styles2.input}
                placeholder="Last Name"
                onChangeText={props.handleChange('last_name')}
                value={props.values.last_name}
              />
              <TextInput
                style={styles2.input}
                placeholder="Email"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
              />
              <View style={styles2.buttonArea}>
                <Button onPress={props.handleSubmit} title="Submit" />
                <Button onPress={closeModal} title="Close" />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  },
);

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 300,
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f3f6',
    marginVertical: 15,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
