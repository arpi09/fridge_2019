import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from './login'
import groceriesReducer from './groceries'


const rootPersistConfig = {
  key: 'root',
  storage,
}

const loginPersistConfig = {
  key: 'login',
  storage,
}

const groceriesPersistConfig = {
  key: 'groceries',
  storage,
}

const rootReducer = combineReducers({
  loginReducer: persistReducer(loginPersistConfig, loginReducer),
  groceriesReducer: persistReducer(groceriesPersistConfig, groceriesReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default persistedReducer
