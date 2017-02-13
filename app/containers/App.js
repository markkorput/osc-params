// @flow
import React, { Component } from 'react';

import Client from '../osc-params/client';
let oscClient = new Client();
oscClient.setup()
.then(() => {
  console.log('setupped');
  oscClient.signup();
  oscClient.requestLayout();
}).catch((err) => {
  console.log("Error while setting up params-client: ", err);
});

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
