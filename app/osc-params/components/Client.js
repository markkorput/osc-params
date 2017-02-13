import React, { PropTypes } from 'react';

class Client extends React.Component {
  // static propTypes = {
  //   client: PropTypes
  //   to: PropTypes.string.isRequired,
  //   children: PropTypes.node.isRequired,
  //   onClick: PropTypes.func,
  // };
  constructor(props) {
    super(props);

    this.state = { host: '', port: '' };

    if (props.client) {
      this.state.host = props.client.serverHost;
      this.state.port = props.client.serverPort;
    }
  }

  // static defaultProps = {
  //   onClick: null,
  // };

  // handleClick = (event) => {
  //   if (this.props.onClick) {
  //     this.props.onClick(event);
  //   }
  //
  //   if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
  //     return;
  //   }
  //
  //   if (event.defaultPrevented === true) {
  //     return;
  //   }
  //
  //   event.preventDefault();
  //   history.push(this.props.to);
  // };

  // render() {
  //   // const { to, children, ...props } = this.props;
  //   // return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  // }

  render() {
    return (<div className="osc-params client">
      <strong>osc-params client</strong>
      <label>host <input type="text" id="host-input" value={this.state.host} /></label>
      <label>port <input type="text" id="port-input" value={this.state.port} /></label>
    </div>);
  }
}

export default Client;
