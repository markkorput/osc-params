import React, { PropTypes } from 'react';
import styles from './Parameter.css';
import Base from './Base';

export default class String extends Base {
  renderParam(param){
    return(
      <div className={styles.container}>
        <label>{param.name}</label><input defaultValue={param.value || ''} onKeyPress={(e) => this.onKeyPress(e)} />
      </div>
    );
  }

  onKeyPress(event){
    if(event.charCode == 13){ // EventEmitter
      this.props.actions.setParamValueManual(this.props.parameterId, event.target.value);
    }
  }
}
