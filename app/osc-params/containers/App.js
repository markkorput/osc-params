// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './IndexPage.css';
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

    // this.client.setup()
    // .then(() => {
    //   // oscClient.signup();
    //   // oscClient.requestLayout();
    // }).catch((err) => {
    //   console.log("Error while setting up osc-params Client: ", err);
    //   // TODO; trigger action
    // });

    // this.props.actions.signup();
    // this.props.actions.requestLayout();
  }

  handleSetClientClick(event){
    event.preventDefault();
    console.log('re-running setClient action');
    this.props.actions.setClient(this.client);
  }

  render() {
    return (
      <div className={styles.container}>
        <Link to="/counter">to Counter</Link>
        <button onClick={() => this.props.actions.setClient(this.client)} />
        <Client/>
      </div>
    );
  }
}

function mapState(state) {
  return {
    params: state.params || {}
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(App);
