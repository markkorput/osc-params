
const initialState = {};

function paramsGroupToParameterList(paramsGroup){
  let state = {};

  for(const item of paramsGroup.getChildren()){
    if(item.type == 'group'){ // if it has a type it means its a param, not a param group
      state = {...state, ...paramsGroupToParameterList(item)}
    } else {
      const param = {
        id: item.getPath(),
        name: item.name,
        type: item.type,
        value: item.get(),
        min: item.getMin(),
        max: item.getMax()
      }

      state[param.id] = param;
    }
  }

  return state;
}

function paramsGroupToGroupList(paramsGroup){
  let state = {};

  let group = {
    id: paramsGroup.getPath(),
    name: paramsGroup.name,
    items: []
  };

  for(let item of paramsGroup.getChildren()){
    if(item.type == 'group'){
      group.items.push({
        type: 'group',
        id: item.getPath()
      });
      state = {...state, ...paramsGroupToGroupList(item)}
    } else {
      group.items.push({
        type: 'parameter',
        id: item.getPath()
      });
    }
  }

  state[group.id] = group;
  return state;
}

export default function params(state = initialState, action) {
  switch(action.type){
    case 'SET_ROOT_PARAMS_GROUP':
      return {
        ...state,
        parameters: paramsGroupToParameterList(action.payload),
        groups: paramsGroupToGroupList(action.payload),
        rootGroupId: action.payload.path
      };

    case 'SET_PARAM_VALUE':
      let newstate = {
        ...state
      };

      newstate.parameters[action.payload.path].value = action.payload.value;
      return newstate;
  }

  return state;
}
