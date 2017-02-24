const initialState = {};

export default function client(state = initialState, action) {
  switch(action.type){
    case 'SET_UI_GROUP':
      return {...state, groupId: action.payload};
  }

  return state;
}
