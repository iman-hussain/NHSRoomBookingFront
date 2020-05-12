/*
  Developed by Liam Penn - 1415065
  Setup redux store, using persist storage and determine which reducer to use. 
  userInfo reducer contains the needed state that can be used across the website without passing parameters.
  Persist storage ensures the users information is not deleted after every refresh. 
*/

import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist"
import storage from "localforage"

import userInfo from './userInfo';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userInfo']
}

const rootReducer = combineReducers({
    userInfo
});

export default persistReducer(persistConfig, rootReducer);