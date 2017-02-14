
const initialState = {};

function paramsGroupToParameterList(paramsGroup, prefix){
  prefix = prefix || '';
  prefix = prefix + paramsGroup.name+".";
  let state = {};

  for(const item of paramsGroup.getChildren()){
    if(item.type == 'group'){ // if it has a type it means its a param, not a param group
      state = {...state, ...paramsGroupToParameterList(item, prefix)}
    } else {
      const param = {
        id: prefix+item.name,
        name: item.name,
        type: item.type,
        value: item.value,
        min: item.min,
        max: item.max
      }

      state[param.id] = param;
    }
  }

  return state;
}

function paramsGroupToGroupList(paramsGroup, prefix){
  prefix = prefix || '';
  prefix = prefix + paramsGroup.name;
  let state = {};

  let group = {
    id: prefix,
    name: paramsGroup.name,
    items: []
  };

  for(let item of paramsGroup.getChildren()){
    if(item.type == 'group'){
      group.items.push({
        type: 'group',
        id: prefix+'.'+item.name
      });
      state = {...state, ...paramsGroupToGroupList(item, prefix+'.')}
    } else {
      group.items.push({
        type: 'parameter',
        id: prefix+'.'+item.name
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
        rootGroupName: action.payload.name
      };
  }

  return state;
}
