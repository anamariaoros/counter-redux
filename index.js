// actions
const increment = {
        type: 'INCREMENT',
    }

const decrement = {
        type: 'DECREMENT',
    }

//reducers
const counterReducer = ( state = 0, action ) => {
    switch( action.type ) {
        case 'INCREMENT':
            return  state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function createStore( reducer, initialState ) {
    let state = initialState;
    let listeners = [ ];

    const dispatch = ( action ) => {
        state = counterReducer( state, action );
        listeners.forEach( listener => listener( ) )
    };

    const getState = () => state;

    const subscribe = ( listener ) => {
        listeners.push( listener );
        return ( ) => {
            const index = listeners.indexOf( listener )
            listeners.splice( index, 1 )
        }
    };

    return {
        getState,
        dispatch,
        subscribe
    }
}

const store = createStore( counterReducer, 0 );

let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
  console.log( "end dispatch and log")
}

store.dispatch( increment );
console.log( store.getState( ) );
store.dispatch( increment );
console.log( store.getState( ) );
store.dispatch( increment );
console.log( store.getState( ) );
store.dispatch( increment );
console.log( store.getState( ) );
store.dispatch( decrement );
console.log( store.getState( ) );
store.dispatch( decrement );
console.log( store.getState( ) );
store.dispatch( decrement );
console.log( store.getState( ) );
store.dispatch( decrement );
console.log( store.getState( ) );
