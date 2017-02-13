const OSC = require('osc-js');

const config = {
    // receiver: 'ws',
    // udpServer: {
    //   host: 'localhost',
    //   port: 41234,
    //   exclusive: false
    // },
  udpClient: {
    //   host: 'localhost',
    port: 8081,
  },
    // wsServer: {
    //   host: 'localhost',
    //   port: 8080
    // }
};

const osc = new OSC({ plugin: new OSC.BridgePlugin(config) });

const start = () => {
  osc.open(); // start a WebSocket server on port 8080
  console.log(`Websocket server listening to port ${osc.options.plugin.options.wsServer.port}`);
  console.log(`OSC client sending to UDP port ${osc.options.plugin.options.udpClient.port}`);
  console.log(`OSC server listening to UDP port ${osc.options.plugin.options.udpServer.port}`);
};

export default { start };
