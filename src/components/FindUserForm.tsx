import React from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {setFilterAC} from '../reducers/actions';
import {FilterType} from '../reducers/users-reducer';

export function FindUser() {
  return (
    <View style={styles.inputWrap}>
      <Formik
        initialValues={{
          term: '',
        }}
        onSubmit={(values: FilterType) => {
          setFilterAC(values.term);
          Alert.alert(values.term);
        }}
      />
      {(props: any) => (
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Find"
            onChangeText={props.handleChange('term')}
            value={props.values.term}
            keyboardType="numeric"
          />
          <Button title="submit" onPress={props.handleSubmit} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    width: '78%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#f1f3f6',
  },
});
