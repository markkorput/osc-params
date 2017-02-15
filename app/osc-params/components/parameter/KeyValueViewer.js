import React, { PropTypes } from 'react';
import styles from './Base.css';

export default class Base extends React.Component {
  static propTypes = {
    key: PropTypes.string,
    value: PropTypes.string
  };

  render() {
    const { key, value } = this.props;

    return(
      <div className="keyval">
        <label>{key || ''}</label><input value={val || ''} readOnly="readOnly" />
      </div>
    );
  }
}
