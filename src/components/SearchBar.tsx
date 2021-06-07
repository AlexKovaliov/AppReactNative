import React from 'react';
import {WHITE} from '../utils/colors';
import {useDispatch} from 'react-redux';
import {StyleSheet, TextInput, View} from 'react-native';
import {setSearchBarValueAC} from '../redux/actions/users-actions';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const {searchBarView, input, inputView} = styles;
  const onSearchHandle = (text: string) => dispatch(setSearchBarValueAC(text));

  return (
    <View style={searchBarView}>
      <View style={inputView}>
        <TextInput
          autoFocus={true}
          style={input}
          placeholder="Search..."
          onChangeText={onSearchHandle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarView: {
    width: 220,
    marginRight: 10,
    marginVertical: 8,
    flexDirection: 'row',
  },
  input: {
    width: 210,
    paddingLeft: 15,
    borderRadius: 20,
    backgroundColor: WHITE,
  },
  inputView: {
    flexDirection: 'row',
  },
});
