import {Action, Store, applyMiddleware, compose, createStore} from 'redux';
import {GamerAppReduxStore} from './';
import createSagaMiddleware from 'redux-saga';
import {persistCombineReducers} from 'redux-persist';
import {PersistPartial} from 'redux-persist/es/persistReducer';
// @ts-ignore
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import reducers from './index';

const storage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

const persistConfig = {
  key: 'gamerapp',
  storage,
};

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedCombinedReducers = persistCombineReducers(
  persistConfig,
  reducers,
);

const rootReducer = (
  state: PersistPartial | undefined,
  action: Action<any>,
) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return persistedCombinedReducers(state, action);
};

export const sagaMiddleware = createSagaMiddleware();

const store: Store<GamerAppReduxStore> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

export default store;
