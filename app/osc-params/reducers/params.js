
const initialState = {};

function paramsGroupToLayoutState(paramsGroup, prefix){
  prefix = prefix || '';
  prefix = prefix + paramsGroup.name+".";
  let state = [];

  for(let item of paramsGroup.children){
    if(item.type){ // if it has a type it means its a param, not a param group
      state.push(prefix+item.name);
    } else {
      state.push(paramsGroupToLayoutState(item))
    }
  }

  return state;
}

function paramsGroupToParamsState(paramsGroup, prefix){
  prefix = prefix || '';
  prefix = prefix + paramsGroup.name+".";
  let state = {};

  for(let item of paramsGroup.children){
    if(item.type){ // if it has a type it means its a param, not a param group
      const param = {
        id: prefix+item.name,
        name: item.name,
        type: item.type,
        value: item.value,
        min: item.min,
        max: item.max
      }

      state[param.id] = param;
    } else {
      state = {...state, ...paramsGroupToParamsState(item, prefix+item.name+".")}
    }
  }

  return state;
}


export default function params(state = initialState, action) {
  switch(action.type){
    case 'SET_ROOT_PARAMS_GROUP':
      return {
        ...state,
        parameters: paramsGroupToParamsState(action.payload),
        layout: paramsGroupToLayoutState(action.payload)
      };
  }

  return state;
}
