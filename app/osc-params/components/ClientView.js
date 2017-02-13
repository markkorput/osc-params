import React, { PropTypes } from 'react';

class ClientView extends React.Component {
  render() {
    return (<div className="client">
      <label>host <input type="text" id="host-input" value={this.props.serverHost || ''} /></label>
      <label>port <input type="text" id="port-input" value={this.props.serverPort || ''} /></label>
    </div>);
  }
}

export default ClientView;
