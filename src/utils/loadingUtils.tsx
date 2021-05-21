import React from 'react';
import {connect} from 'react-redux';
import {AppRootStateType} from '../store';
import {RequestStatusType} from '../redux/app-reducer';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

type MapStatePropsType = {
  isLoading: RequestStatusType;
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
        {this.props.isLoading ? (
          <View>
            <ActivityIndicator color={'#3949ab'} size="large" />
            <Text style={text}>Loading...</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
export default connect(mapStateToProps)(Loading);

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    color: '#3949ab',
    fontStyle: 'italic',
  },
});
