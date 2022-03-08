import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import singleExperienceReducer from './singleExperience'
import roomsReducer from './rooms'
import singleRoomReducer from './singleRoom';
import experiencesReducer from './experiences';
import usersReducer from './users'
import shopping_cart from './shopping_cart'
import reservationsReducer from './reservations'
import cartItemsReducer from './cartItems';

const reducer = combineReducers({ auth, singleExperienceReducer, roomsReducer, singleRoomReducer, experiencesReducer, usersReducer, shopping_cart, reservationsReducer, cartItemsReducer})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
