import React from 'react';
import {connect} from 'react-redux';
import {AppRootStateType} from '../store';
import {IRIS_BLUE, SOLITUDE} from './colors';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

type MapStatePropsType = {
  isLoading: boolean;
};
type PropsType = MapStatePropsType;

function mapStateToProps(state: AppRootStateType): MapStatePropsType {
  const {appStore} = state;
  return {isLoading: appStore.isLoading};
}

class Loading extends React.PureComponent<PropsType> {
  render() {
    const {container, text} = styles;

    return (
      <View style={container}>
        <ActivityIndicator color={IRIS_BLUE} size="large" />
        <Text style={text}>Loading...</Text>
      </View>
    );
  }
}
export default connect(mapStateToProps)(Loading);

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: SOLITUDE,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    color: IRIS_BLUE,
    fontStyle: 'italic',
  },
});
