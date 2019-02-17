import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
/**
 * Redux Thunk => Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 */
/**
 * combineReducers => this is a function which takes a javascript object mapping our reducers to different slices of our state as input and merges everything into one state and one reducer for us.
 */
// import reducer from './store/single-reducer'
import counterReducer from './store/reducers/counter'
import resultReducer from './store/reducers/result'


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 * So now we're telling redux in the end, hey I got two different feature areas in my application,ctr and res,please use these reducers for each of them and merge everything together into one store, into one state,into one reducer.
 */
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

/** Middleware
 * I want to create a simple middleware which simply logs each action we issue.
 * It will get the store as an input, this is the case because we will soon use a specific method provided by redux to connect our own middleware to the store and this method provided by redux will eventually execute our middleware function and give us the store.
 */
const logger = store => {
    //next : makes sense because this will be a function which you can execute to let the action continue its journey onto the reducer
    return next => {
        // and now it really becomes a bit confusing but this function now also returns a function, which will receive the action you dispatched, as an input,again this function will also be executed for you.
        return action => {
            // And here we can now execute the code we want to run in between the action and the reducer.
            console.log('[Middleware] Dispatching', action)
            // action.type = "DECREMENT"; // here you can also mutate the dispatched action. but do this with caution. Try it out !

            // Thereafter, I will execute next: this will now let the action continue to the reducer, though for that to succeed,we need to pass the action as an argument
            const result = next(action);
            //Now in between these two steps, I can log something else,
            console.log('[Middleware] next state', store.getState());
            //I can now store the result of this call which I will need to return in this inner function,            
            return result;
        }
    }
}
/**
 * Redux Devtool Setup - see documentation
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * So the function tree ( logger ) is in the end what gets executed,all of that is done by redux, we don't have to call any of these functions,all we have to do is apply this middleware to our store.
 * 
 * So here in create store where we initialize the store,we can add more arguments and the second argument here can be a so-called enhancer.Now this enhancer is nothing else than a middleware 
 */
// const store = createStore(rootReducer, applyMiddleware(logger)); //support Middleware only 
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk))
); // support Middleware and ReduxDev tool, both the enhancers
console.log(store.getState());

/**
 * Provider is a helper component which allows us to kind of inject our store into the react components.
 */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

