import { combineReducers } from 'redux';
import client from './client';
import params from './params';

const rootReducer = combineReducers({
  client,
  params
});

export default rootReducer;
