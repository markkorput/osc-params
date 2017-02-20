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

  // this method is called by the
  set(id, value, opts){
    opts = opts || {};

    let param = this.getParamById(id);

    if(!param)
      return;

    // param.set returns true if the value changed
    // if there was no change, we're done
    let setResult = param.set(value, {force: opts.manual !== true});

    if(setResult != true){
      this.eventEmitter.emit('valueRejected', param);
      return;
    }

    // if the value was changed manually (locally),
    // send the value to master
    if(opts.manual == true){
      // TODO? check if id matches any of the local ids
      this._send(id, [param.getValueAsString()]);
      return;
    }

    // update came from master; notify UI listeners
    this.eventEmitter.emit('paramUpdate', param);
  }

  getParamById(id){
    for(const param of this.group ? this.group.getParameters() : []){
      if(param.path == id)
        return param;
    }

    return null;
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

    // console.log('_sending: ', address, ' with: ', args);
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
        this.set(param.path, msg.args[0]);
      });
    }
  }
}

export default Client;
