import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {usersReducer} from './reducers/users-reducer';
import {appReducer} from './reducers/app-reducer';
import {personReducer} from './reducers/person-reducer';
import {compose} from 'redux';

const rootReducer = combineReducers({
  usersStore: usersReducer,
  appStore: appReducer,
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
