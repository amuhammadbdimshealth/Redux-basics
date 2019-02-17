import * as actionTypes from '../../store/actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    results: []
}

const storeResult = (state, action) => {
    let results = [...state.results];
    // results.push({id: new Date(), value: state.counter});
    results.push({ id: new Date(), value: action.counter });
    return updateObject(state, { results: results });
}
const removeResult = (state, action) => {
    let results = [...state.results];
    const index = results.findIndex(r => r.id === action.id);
    results.splice(index, 1);
    return updateObject(state, { results: results });
}
/**
 * Whenever you dispatch something, it goes through that single reducer you have in your application.Therefore if that reducer doesn't handle that action type you dispatched,you have to return the current state to not break your application.
 * 
 * Inside this reducer function, it basically has no access to the global state only to that state of that reducer function i.e results. That's different than the counter component where we connect our react component to the global state, there we can access the different pieces of the state through our slices we set up in index.js
 * 
 *So if we are in a reducer where we need to get a value from the global state, we should simply get it as an => [ action payload ]. 
 */
const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT: return storeResult(state, action)
        case actionTypes.REMOVE_RESULT: return removeResult(state, action);
    }
    return state;
}

export default resultReducer; 