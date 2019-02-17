import * as actionTypes from './actions'

const initialState = {
    counter: 0,
    results: []
}
/**
 * Whenever you dispatch something, it goes through that single reducer you have in your application.Therefore if that reducer doesn't handle that action type you dispatched,you have to return the current state to not break your application.
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            };
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            };
        case actionTypes.STORE_RESULT:
            let results = [...state.results];
            results.push({id: new Date(), value: state.counter});
            return {
                ...state,
                results: results
            };
        case actionTypes.REMOVE_RESULT: 
            results = [...state.results];
            const index = results.findIndex(r => r.id === action.id);
            results.splice(index,1);
            return {
                ...state,
                results: results
            };
    }
    return state;
}

export default reducer; 