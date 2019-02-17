import * as actionTypes from './actionTypes'

/** Action creator : 
 * An action creator is just a function which returns an action or which creates an action
 */
export const increment = () => {
    // returns an action
    return {
        type: actionTypes.INCREMENT
    };
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    };
}
export const add = (value) => {
    return {
        type: actionTypes.ADD,
        value: value
    };
}
export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        value: value
    };
}