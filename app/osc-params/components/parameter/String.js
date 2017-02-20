import React, { PropTypes } from 'react';
import Base from './Base';

export default class String extends Base {
  renderParam(param){
    return(
      <div className="container">
        <label>{param.name}</label><input defaultValue={param.value || ''} onKeyPress={(e) => this.onKeyPress(e)} />
      </div>
    );
  }

  onKeyPress(event){
    if(event.charCode == 13){ // enter/submit
      this.props.actions.setParamValueManual(this.props.parameterId, event.target.value);
    }
  }
}
