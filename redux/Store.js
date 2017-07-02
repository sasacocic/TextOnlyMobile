import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducers from './Reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'


const initialState = {
  currentAuthUser: {
    name: 'test',
    other: 'swag'
  }
}

// need to see if you can hydrate the store from server
// or
export default applyMiddleware(thunk,logger)(createStore)(reducers,initialState)
