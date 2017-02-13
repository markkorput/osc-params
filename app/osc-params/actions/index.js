
export function setClient(client){
  console.log('inside setClient action');
  return {
    type: 'SET_CLIENT',
    payload: {
      localPort: client.localPort,
      serverHost: client.serverHost,
      serverPort: client.serverPort
    }
  }
}
