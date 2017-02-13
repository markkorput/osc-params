// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import oscParams from '../osc-params/reducers';

const rootReducer = combineReducers({
  counter,
  oscParams,
  routing
});

export default rootReducer;
