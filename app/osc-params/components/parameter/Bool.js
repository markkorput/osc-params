import React, { PropTypes } from 'react';
import Base from './Base';
import styles from './Parameter.css';

const paramValueReducer = (state, path) => {
  return state.parameters[path].value;
}

export default class Bool extends Base {
  renderParam(param){
    const value = (param.value == '1');
    const trueStyle = {color: 'green'};
    const falseStyle = {color: 'red'};
    return(
      <div className={styles.container} onClick={(e) => this.onClick(e)}>
        <label>{param.name}</label><input style={value ? trueStyle : falseStyle} value={value ? 'true' : 'false'} readOnly="readOnly" />
      </div>
    );
  }

  onClick(event){
    event.preventDefault();
    let value = paramValueReducer(this.props.state, this.props.parameterId);
    value = (value == '1');
    this.props.actions.setParamValueManual(this.props.parameterId, value ? false : true);
  }
}
