import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';

type NewUserType = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  avatar: string;
};

type AddUserFormType = {
  addReview: (newUser: NewUserType) => void;
};

export const AddUserForm = React.memo(({addReview}: AddUserFormType) => {
  return (
    <View>

    </View>
  );
});

export const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f3f6',
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
