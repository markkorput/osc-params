// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './IndexPage.css';
import Client from '../components/Client';

export default class IndexPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/counter">to Counter</Link>
        <Client/>
      </div>
    );
  }
}
