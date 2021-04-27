import {Dispatch} from 'redux';
import {ResponseUsersType, usersAPI} from '../api/users-api';
import {chosenPersonAC, setUsersAC, setStatusSetErrorAC} from './actions';

export const chosenPersonTC = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setStatusSetErrorAC(true, null));
  // запрос на бек должен быть в try, поскольку может быть еррор, в случае, если будет еррор, он не будет обработан
  let response = await usersAPI.chosenPerson(id);
  try {
    dispatch(chosenPersonAC(response.data));
    dispatch(setStatusSetErrorAC(false, null));
  } catch (error) {
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};

// страницу не передавать, получать из getState
export const getUsersTC = (page: number) => async (
  dispatch: Dispatch,
  getState: ResponseUsersType,
) => {
  dispatch(setStatusSetErrorAC(true, null));
  const totalPage = getState.total_pages;
  if (totalPage && page > totalPage) {
    return;
  }
  let response = await usersAPI.getUsers(page);
  try {
    if (response.data) {
      dispatch(setUsersAC(response.data.data, page, response.data.total_pages));
      dispatch(setStatusSetErrorAC(false, null));
    }
  } catch (error) {
    //на chosenPersonTC и на getUsersTC одна ошибка, если юзер получет ошибку на person room, она же будет и на Users скрине
    dispatch(setStatusSetErrorAC(false, error.message));
  }
};
