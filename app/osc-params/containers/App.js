// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './App.css';
import Client from '../components/Client';
import * as Actions from '../actions';
import OscClient from '../client';


class App extends Component {
  constructor(props){
    super(props);
    this.client = new OscClient();
  }

  componentDidMount(){
    console.log('running setClient action');
    this.props.actions.setClient(this.client);

    this.client.setup()
    .then(() => {
      this.client.signup();

      this.client.eventEmitter.on('layoutUpdated', (client) => {
        this.props.actions.setRootParamsGroup(client.group)
      });

      this.client.requestLayout();
    }).catch((err) => {
      console.log("Error while setting up osc-params Client: ", err);
      // TODO; trigger action
    });

    // this.props.actions.signup();
    // this.props.actions.requestLayout();
  }

  handleSetClientClick(event){
    event.preventDefault();
    this.props.actions.setClient(this.client);
  }

  render() {
    return (
      <div className={styles.container}>
        <Link to="/counter">to Counter</Link>
        <Client {...this.props.client} />
        <button onClick={() => this.client.signup()}>send signup</button>
        <button onClick={() => this.client.requestLayout()}>request layout</button>
      </div>
    );
  }
}

function mapState(state) {
  // console.log('mapState: ', state);
  return state.oscParams || {}
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(App);
