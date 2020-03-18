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