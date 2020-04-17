import {createStore, applyMiddleware} from 'redux'
import combineReducers from '../reducers'
import thunk from 'redux-thunk'

function configureStore(initialState) {
    const store = createStore(combineReducers, initialState, applyMiddleware(thunk));
    return store;
}

const store = configureStore();

export default store;