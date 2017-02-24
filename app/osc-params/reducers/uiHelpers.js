export function uiGroupVisiblityReducer(uiState, groupId){
  return (uiState.groupVisibilities || {})[groupId] !== false;
}
