import {JokesType} from '../../api/jokes-api';

//Getting news
export type FetchJokesACType = ReturnType<typeof fetchJokesAC>;
export const fetchJokesAC = (jokes: Array<JokesType>) =>
  ({type: 'JOKES/FETCH_JOKES', jokes} as const);
