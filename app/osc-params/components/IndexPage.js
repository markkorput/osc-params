// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './IndexPage.css';
import Client from './Client';

export default class IndexPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Client/>
      </div>
    );
  }
}
