import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from './login'
import expireReducer from 'redux-persist-expire'


const rootPersistConfig = {
  key: 'root',
  storage,
}

const loginPersistConfig = {
  key: 'login',
  storage,
}

const rootReducer = combineReducers({
  loginReducer: persistReducer(loginPersistConfig, loginReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default persistedReducer
