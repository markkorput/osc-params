// local
// const Group = require("./group")
// const Layout = require("./layout")

// const OSC = require('osc-js')
// the client-side OSC library is included in the Html components
import OSC from 'osc-js';
import Promise from 'bluebird';

class Client {
  constructor() {
    this.localPort = 8082;
    this.serverHost = '127.0.0.1';
    this.serverPort = 8081;
  }

  setup() {
    return new Promise((resolve, reject) => {
      this.osc = new OSC();

      this.osc.on('error', reject);
      this.osc.on('open', resolve);

      this.osc.on('message', (msg) => {
          console.log('msg! ', msg)
      });

      //
      // @osc.on '/ofxOscPlus/layout', (msg) =>
      //     console.log('layout! ', msg)
      //     layout = new Layout(msg.args[0])
      //
      //     if @group
      //         layout.applyToGroup(@group)
      //     else
      //         @group = layout.getGroup()

      this.osc.open(); // connect by default to ws://localhost:8080
      this.configureBridge();
    });

        // this.signup();
        // this.requestLayout()
  }

    // _onMessage(msg, rinfo){
    //     // console.log("An OSC packet just arrived: ", packet, " :: ", info);
    //     if(msg[0] == "/ofxOscPlus/layout"){
    //
    //         if(msg.length < 2){
    //             console.log("got /ofxOscPlus/layout OSC message without args");
    //             return;
    //         }
    //
    //         if(!this.group)
    //             this.group = new Group();
    //
    //         var layout = new Layout(msg[1]);
    //         layout.applyTo(this.group);
    //
    //         if(this.onLayout)
    //             this.onLayout(this);
    //
    //         return;
    //     }
    // }

    // _onPacket(packet, info){
    //     // console.log("An OSC packet just arrived: ", packet, " :: ", info);
    //     if(packet.address == "/ofxOscPlus/layout"){
    //         if(packet.args.length < 1){
    //             console.log("got /ofxOscPlus/layout OSC message without args");
    //             return;
    //         }
    //
    //         if(!this.group)
    //             this.group = new Group();
    //
    //         var layout = new Layout(packet.args[0]);
    //         layout.applyTo(this.group);
    //
    //         if(this.onLayout)
    //             this.onLayout(this);
    //         return;
    //     }
    // }

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
    this._send('/ofxOscPlus/layout', [this.localPort]);
  }

  configureBridge() {
      console.log("configureBridge not implemented yet");
  }
}

export default Client;
