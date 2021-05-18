import {compose} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './reducers/app-reducer';
import {usersReducer} from './reducers/users-reducer';
import {personReducer} from './reducers/person-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  appStore: appReducer,
  usersStore: usersReducer,
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
