import React, { Component } from 'react';
import { connect } from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

// import * as actionTypes from '../../store/actions'
import * as actionCreators from '../../store/actions/index'

class Counter extends Component {
    // state = {
    //     counter: 0
    // }
    componentWillUpdate(nextProps, nextState) {
        console.log('[componentWillUpdate]', { nextProps, nextState })
    }
    componentDidUpdate() {
        console.log('[componentDidUpdate]', this.props)
    }
    componentDidMount() {
        console.log('[componentDidMount]', this.props)
    }
    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { counter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
        }
    }

    render() {
        return (
            <div>
                {/* <CounterOutput from="internal State" value={this.state.counter} />
                <CounterControl label="Increment" clicked={() => this.counterChangedHandler('inc')} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler('dec')} />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler('add', 5)} />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler('sub', 5)} /> */}

                <CounterOutput from="redux State" value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={() => this.props.onDecrementCounter()} />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)} />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>
                    {this.props.results.map((result, index) => {
                        return (
                            <li
                                key={result.id}
                                onClick={() => this.props.onRemoveResult(result.id)}>
                                {result.value}
                            </li>
                        );
                    })}

                </ul>

            </div>
        );
    }
}

/**
 * we pass two pieces of information to connect : 
 * Which slice of the state do I want to get in this container, and which actions do I want to dispatch
 */
/**
 * mapStatetoProps => In here You store instructions about how the state managed by redux should be mapped to props you can use in this container. 
 * the state managed by redux is not received as state here because state is the thing you change internally from within a component.Those times are over,redux is now the place where we manage and change the state, so we don't want to get anything which we can change internally and props aren't changed internally,that is why we map the redux state to props.
 * 
 * mapStateToProps, it actually stores a function which expects the state stored in redux as the input and returns a javascript object which is a map of prop names and slices of the state stored in redux.
 * 
 * Combined Reducers => now we will have one state in the end but to avoid naming conflicts, redux adds one level of nesting where it has one state object but with these keys( ctr, res = since these are the names we gave theses slices of our global state) here, in combined reducers as properties which give us access to these sub-states for these feature areas,
 */
const mapStateToProps = state => {
    return {
        counter: state.ctr.counter,
        results: state.res.results
    };
}
/**
 * We can also pass a second configuration, I'll name it mapDispatchToProps because here I'll say which kind of actions do I want to dispatch in this container.
 * This also stores a function which will receive the dispatch function which we can execute as an argument, just as we have dispatch available on the store here,if we directly access the store, the react-redux package gives us well basically this helper function which will call dispatch on the store behind the scenes.We then here also return a javascript object where we can define some prop names which will hold a reference to a function which should eventually get executed to dispatch an action. We then have to pass this mapping to connect.

 */
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: (value) => dispatch(actionCreators.add(value)),
        onSubtractCounter: (value) => dispatch(actionCreators.subtract(value)),
        onStoreResult: (curCounter) => dispatch(actionCreators.storeResult(curCounter)),
        onRemoveResult: (id) => dispatch(actionCreators.removeResult(id))
    };
}

// connect is a function which returns a hoc
export default connect(mapStateToProps, mapDispatchToProps)(Counter);