
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
