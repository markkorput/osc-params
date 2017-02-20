export function paramReducer(state, path){
  return state.parameters[path];
}

export function paramValueReducer(state, path){
  return state.parameters[path].value;
}

export function paramMinReducer(state, path){
  return state.parameters[path].min;
}

export function paramMaxReducer(state, path){
  return state.parameters[path].max;
}
