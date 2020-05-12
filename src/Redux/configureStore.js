/*
  Developed by Liam Penn - 1415065
  Make redux-persist work with the redux store. 
  Return a store to be called within the application as a higher order component to be accessible by all components.
*/

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"

import rootReducer from './reducers'

const configStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  })
  const persistor = persistStore(store)
  return [store, persistor]
}

export default configStore