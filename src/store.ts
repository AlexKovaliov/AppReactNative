import {compose} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './redux/app-reducer';
import {jokesReducer} from './redux/jokes-reducer';
import {usersReducer} from './redux/users-reducer';
import {groupReducer} from './redux/group-reducer';
import {personReducer} from './redux/person-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  appStore: appReducer,
  jokesStore: jokesReducer,
  usersStore: usersReducer,
  groupStore: groupReducer,
  personStore: personReducer,
});

// redux dev-tools
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
// export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
export type AppRootStateType = ReturnType<typeof rootReducer>;
