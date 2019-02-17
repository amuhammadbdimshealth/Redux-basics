const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

/**
 * Now this function here receives two arguments,the first one is the current state because, the reducer gets two arguments,state and the action and the state is the old state which it then may update.The function has to return one thing and that is the updated state.
 */
// Reducer
/**
 * so now it will take initial state whenever state is undefined, which will be the case when it's creating that store where it will execute the reducer for the first time.
 */
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};


/**
 * A store needs to be initialized with a reducer
 * The reducer is strongly connected to the store,it's the only thing that may update the state in the end.That's why we need to pass the reducer to this creation function here because it's so closely connected to the state.
 */

// Store
const store = createStore(rootReducer);
console.log(store.getState());


/**
 * Subscriptions make sure that I don't have to manually call getState here in my code if I want to get the current state snapshot but to inform me whenever I need to get a new state because something changed
 * Now subscribe takes an argument, a function which will be executed when ever the state is updated,so whenever an action reached the reducer. Subscribe must be declared before dispatching actions.
 */
// Subscription
store.subscribe(() => {
    console.log('[Subscription]',store.getState());
})


/**
 * Dispatch is a function and now important, this dispatch function here takes an argument and that argument is an action, that should be a javascript object which needs to have a type property.This will later be important building block in getting the information which type of action was dispatched and what we should do in the reducer.
 */
// Dispatching Action
store.dispatch({ type: 'INC_COUNTER' })
store.dispatch({ type: 'ADD_COUNTER', value: 10 })
console.log(store.getState());

