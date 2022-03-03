import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import singleExperienceReducer from './singleExperience'
import roomsReducer from './rooms'
import singleRoomReducer from './singleRoom';
import experiencesReducer from './experiences';

const reducer = combineReducers({ auth, singleExperienceReducer, roomsReducer, singleRoomReducer, experiencesReducer})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
