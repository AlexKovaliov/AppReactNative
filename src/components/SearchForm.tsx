import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {WHITE} from '../utils/colors';
import {useDispatch} from 'react-redux';
import {setFilterAC} from '../redux/actions';

export const SearchForm = () => {
  const dispatch = useDispatch();
  const {areaStyle, input, searchArea} = styles;
  const handleSearch = (text: string) => dispatch(setFilterAC(text));

  return (
    <View style={areaStyle}>
      <View style={searchArea}>
        <TextInput
          autoFocus={true}
          style={input}
          placeholder="Search..."
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  areaStyle: {
    width: 220,
    marginRight: 10,
    marginVertical: 8,
    flexDirection: 'row',
  },
  input: {
    width: 210,
    backgroundColor: WHITE,
    paddingLeft: 15,
    borderRadius: 20,
  },
  searchArea: {
    flexDirection: 'row',
  },
});
