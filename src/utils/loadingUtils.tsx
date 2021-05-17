import React from 'react';
import {connect} from 'react-redux';
import {AppRootStateType} from '../store';
import {RequestStatusType} from '../reducers/app-reducer';
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
    return (
      <View style={styles.container}>
        {this.props.isLoading ? (
          <View>
            <ActivityIndicator color={'#3949ab'} size="large" />
            <Text style={styles.text}>Loading...</Text>
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
