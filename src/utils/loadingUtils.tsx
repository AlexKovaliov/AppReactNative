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
  const {app} = state;
  return {isLoading: app.isLoading};
}

class Loading extends React.PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.isLoading ? (
          <View>
            <ActivityIndicator color={'#3949ab'} size={100} />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontStyle: 'italic',
  },
});
