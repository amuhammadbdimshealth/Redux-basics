import * as actionTypes from './actionTypes'


/** Redux-thunk => 
 * Now the new action will reach the reducer but in-between, redux-thunk is able to wait because it can dispatch an action whenever it wants.
 */
export const saveResult = (curCounter) => {
    // const up = curCounter * 2; // can modify the action here ! wow ! OR you can execute the same logic inside the reducer.
    return {
        type: actionTypes.STORE_RESULT,
        counter: curCounter
    }; 
}
/**
 * The Action creators like storeResult which runs some asynchronous code are only possible due to redux-thunk and are caught in between,they never make it to the reducer, we only use them as a utility step in-between to run our asynchronous code which happens to be required to run on a lot of actions and then dispatch the synchronous action to change the state in the store
 */
export const storeResult = (curCounter) => {
    return (dispatch) => {
        setTimeout(() => { 
            dispatch(saveResult(curCounter));
        }, 2000)
    }

}
export const removeResult = (id) => {
    return {
        type: actionTypes.REMOVE_RESULT,
        id: id
    };
}
