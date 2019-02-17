import * as actionTypes from '../../store/actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    counter: 0,

}
/**
 * Whenever you dispatch something, it goes through that single reducer you have in your application.Therefore if that reducer doesn't handle that action type you dispatched,you have to return the current state to not break your application.
 */
const counterReducer = (state = initialState, action) => {
    console.log("[counter-reducer.js] => action", action);

    switch (action.type) {
        case actionTypes.INCREMENT:
            return updateObject(state, {counter: state.counter + 1});
            
        case actionTypes.DECREMENT:
            return updateObject(state, { counter: state.counter - 1 });

        case actionTypes.ADD:
            return updateObject(state, { counter: state.counter + action.value });

        case actionTypes.SUBTRACT:
            return updateObject(state, { counter: state.counter - action.value });

    }
    return state;
}

export default counterReducer; 