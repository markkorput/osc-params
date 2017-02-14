import OSC from 'osc-js';
import Promise from 'bluebird';
import EventEmitter from 'events';

const Layout = require("./layout")

class Client {
  constructor(localPort, serverHost, serverPort) {
    this.localPort = localPort || 8082;
    this.serverHost = serverHost || '127.0.0.1';
    this.serverPort = serverPort || 8081;
    this.eventEmitter = new EventEmitter();
  }

  setup() {
    return new Promise((resolve, reject) => {
      this.osc = new OSC();

      this.osc.on('error', reject);
      this.osc.on('open', resolve);

      // this.osc.on('message', (msg) => {
      //     console.log('msg! ', msg)
      // });

      this.osc.on('/ofxOscPlus/layout', (msg) => {this._onLayoutMessage(msg);});

      this.osc.open(); // connect by default to ws://localhost:8080
      this.configureBridge();
    });

    // this.signup();
    // this.requestLayout()
  }

  _onLayoutMessage(msg){
    // console.log('layout! ', msg)
    let layout = new Layout(msg.args[0])

    if(this.group)
       layout.applyTo(this.group)
    else
       this.group = layout.getGroup()

    this.eventEmitter.emit('layoutUpdated', this);
    this._registerParameterCallbacks()
  }

  _send(address, args) {
    let message = new OSC.Message(address);

    for (let arg of args || []) {
      message.add(arg);
    }

    if (this.osc.status() != OSC.STATUS.IS_OPEN) {
      console.log("Osc connection not yet open, can't send message: ", message);
      return;
    }

    this.osc.send(message);
  }

  signup() {
    this._send('/ofxOscPlus/signup', [this.localPort]);
  }

  signoff() {
    this._send('/ofxOscPlus/signoff', [this.localPort]);
  }

  requestLayout() {
    console.log('requesting layout');
    this._send('/ofxOscPlus/layout', [this.localPort]);
  }

  configureBridge() {
      console.log("configureBridge not implemented yet");
  }

  _registerParameterCallbacks(){
    if(!this.group){
      return;
    }


    for(const param of this.group.getParameters()){
      // console.log('register OSC value listener: ' + param.path);
      this.osc.on(param.path, (msg) => {
        // console.log('value ', msg.args[0], ' for ', msg.address);
        param.set(msg.args[0]);
        this.eventEmitter.emit('paramUpdate', param);
      });
    }
  }
}

Client.instance_for = (localPort, serverHost, serverPort) => {
    Client._instances = Client._instances || []
    for(let instance of Client._instances){
        if(instance.localPort == localPort
                && instance.serverHost == serverHost
                && instance.serverPort == serverPort){
            return instance;
        }
    }

    let newInstance = new Client(localPort, serverHost, serverPort);
    Client._instances.push(newInstance);
    return newInstance;
}

export default Client;
