import {JokesType} from '../api/jokes-api';
import {FetchJokesACType} from './actions/jokes-actions';

type ActionsType = FetchJokesACType;

export type InitialJokesStateType = typeof initialState;

const initialState = {
  jokes: [] as Array<JokesType>,
};

export const jokesReducer = (
  state: InitialJokesStateType = initialState,
  action: ActionsType,
): InitialJokesStateType => {
  switch (action.type) {
    case 'JOKES/FETCH_JOKES':
      return {...state, jokes: action.jokes};

    default:
      return state;
  }
};
