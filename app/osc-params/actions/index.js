import EventEmitter from 'events';

export const eventEmitter = new EventEmitter();

export function setClient(client){
  return {
    type: 'SET_CLIENT',
    payload: {
      localPort: client.localPort,
      serverHost: client.serverHost,
      serverPort: client.serverPort
    }
  }
}

export function setRootParamsGroup(paramsGroup){
  return {
    type: 'SET_ROOT_PARAMS_GROUP',
    payload: paramsGroup
  }
}

export function setParamValue(path, value){
  return {
    type: 'SET_PARAM_VALUE',
    payload: {
      path: path,
      value: value
    }
  }
}

export function setParamValueManual(path, value){
  eventEmitter.emit('setParamValue', path, value);
  return setParamValue(path, value);
}

export function setUiGroup(groupId){
  return {
    type: 'SET_UI_GROUP',
    payload: groupId
  }
}
