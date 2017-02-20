import React, { PropTypes } from 'react';
import Base from './Base';
import styles from './Parameter.css';

/* reducers */
const paramValueReducer = (state, path) => {
  return state.parameters[path].value;
}

const paramMinReducer = (state, path) => {
  return state.parameters[path].min;
}

const paramMaxReducer = (state, path) => {
  return state.parameters[path].max;
}

export default class Number extends Base {
  renderParam(param) {
    const val = window.Number((param.value).toFixed(6));

    return (
      <div className={styles.container} onMouseDown={(e) => this.onMouseDown(e)} onMouseUp={(e) => this.onMouseUp(e)}>
        <label>{param.name}</label><input value={val} readOnly="readOnly" />
      </div>
    );
  }

  onMouseDown(event){
    event.preventDefault();
    const el = event.target;
    el.requestPointerLock = el.requestPointerLock || el.mozRequestPointerLock;
    el.requestPointerLock();
    this.mousemovelistener = (e) => this.onDrag(e);
    document.addEventListener("mousemove", this.mousemovelistener, false);
  }

  onMouseUp(event){
    event.preventDefault();
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    document.exitPointerLock();
    document.removeEventListener("mousemove", this.mousemovelistener, false);
    this.mousemovelistener = undefined;
  }

  onDrag(event){
    event.preventDefault();

    let value = paramValueReducer(this.props.state, this.props.parameterId);
    const min = paramMinReducer(this.props.state, this.props.parameterId);
    const max = paramMaxReducer(this.props.state, this.props.parameterId);

    let sensitivity = Math.min(1.0, Math.abs(max-min)*0.01);
    value += sensitivity * event.movementX;

    if(min !== undefined && value < min)
      value = min;
    if(max !== undefined && value > max)
      value = max;

    this.props.actions.setParamValueManual(this.props.parameterId, value);
  }
}
