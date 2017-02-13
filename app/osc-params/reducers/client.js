
const initialState = {};

export default function client(state = initialState, action) {
  switch(action.type){
    case 'SET_CLIENT':
      return {...state, ...action.payload};
  }

  return state;
}
