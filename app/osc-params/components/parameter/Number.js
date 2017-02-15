import React, { PropTypes } from 'react';
import Base from './Base';
import styles from './Parameter.css';

/* reducers */
const paramValueReducer = (state, path) => {
  return state.parameters[path].value;
}

export default class Number extends Base {
  renderParam(param) {
    return (
      <div className={styles.container} onMouseDown={(e) => this.onMouseDown(e)} onMouseUp={(e) => this.onMouseUp(e)}>
        <label>{param.name}</label><input value={param.value || ''} readOnly="readOnly" />
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
    let sensitivity = 1.0;
    this.props.actions.setParamValueManual(this.props.parameterId, paramValueReducer(this.props.state, this.props.parameterId) + sensitivity * event.movementX)
  }
}
