import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userReducer from  '../redux/user.Slice.js'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { version } from 'mongoose'
import persistStore from 'redux-persist/es/persistStore'
const rootReducer=combineReducers({userStore:userReducer})
const persistConfig=
{
   key:'root',
   storage,
   version:1
}
const persistedReducer=persistReducer(persistConfig,rootReducer)
export const Store = configureStore({
  reducer: persistedReducer
})
export const persistor=persistStore(Store)