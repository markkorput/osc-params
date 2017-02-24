const initialState = {};

export default function client(state = initialState, action) {
  switch(action.type){
    case 'SET_UI_GROUP':
      return {...state, groupId: action.payload};

    case 'SET_UI_GROUP_VISIBILITY':
      let newState = {...state};
      newState.groupVisibilities = newState.groupVisibilities || {};
      newState.groupVisibilities[action.payload.groupId] = action.payload.visible;
      return newState;
  }

  return state;
}
