import {Dispatch} from 'redux';
import {setErrorPersonAC} from '../actions/person-actions';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {setCameraGrantedAC, setReadStorageAC} from '../actions/app-actions';

//app
export const cameraPermission = () => async (dispatch: Dispatch) => {
  try {
    const result = await check(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      dispatch(setCameraGrantedAC(true));
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(PERMISSIONS.ANDROID.CAMERA);
      requestResult === RESULTS.GRANTED
        ? dispatch(setCameraGrantedAC(true))
        : dispatch(setCameraGrantedAC(false));
    }
  } catch (error) {
    dispatch(setErrorPersonAC(false, error.message));
  }
};

export const readStoragePermission = () => async (dispatch: Dispatch) => {
  try {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      dispatch(setReadStorageAC(true));
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      requestResult === RESULTS.GRANTED
        ? dispatch(setReadStorageAC(true))
        : dispatch(setReadStorageAC(false));
    }
  } catch (error) {
    dispatch(setErrorPersonAC(false, error.message));
  }
};
