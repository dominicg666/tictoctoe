import { combineReducers, createStore } from 'redux';
import { enhancer, reducers } from '@baaz/adapter';
// export default createStore(rootReducer, rootEnhancer);
const rootReducer = combineReducers({ ...reducers });
//const rootReducer = combineReducers(reducers);

export default createStore(rootReducer, enhancer);
