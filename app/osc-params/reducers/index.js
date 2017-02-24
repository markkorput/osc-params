import { combineReducers } from 'redux';
import client from './client';
import params from './params';
import ui from './ui';

const rootReducer = combineReducers({
  client,
  params,
  ui
});

export default rootReducer;
