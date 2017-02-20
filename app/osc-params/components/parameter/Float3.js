import React, { PropTypes } from 'react';
import Base from './Base';
import styles from './Parameter.css';
import * as paramHelpers from '../../reducers/paramHelpers';

export default class Float3 extends Base {
  renderParam(param) {
    const labels = ['X', 'Y', 'Z'];
    return (
      <div className="param color">
        {param.value.map((attr,idx) =>
          <div key={idx} className={styles.container} onMouseDown={(e) => this.onMouseDown(idx, e)} onMouseUp={(e) => this.onMouseUp(e)}>
            <label>{param.name} ({labels[idx]})</label><input value={Number((param.value[idx]).toFixed(6))} readOnly="readOnly" />
          </div>
        )}
      </div>
    );
  }

  onMouseDown(idx, event){
    event.preventDefault();
    const el = event.target;
    el.requestPointerLock = el.requestPointerLock || el.mozRequestPointerLock;
    el.requestPointerLock();
    this.mousemovelistenerIndex = idx;
    this.mousemovelistener = (e) => this.onDrag(e);
    document.addEventListener("mousemove", this.mousemovelistener, false);
  }

  onMouseUp(event){
    event.preventDefault();
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    document.exitPointerLock();
    document.removeEventListener("mousemove", this.mousemovelistener, false);
    this.mousemovelistener = undefined;
    this.mousemovelistenerIndex = undefined;
  }

  onDrag(event){
    event.preventDefault();

    // get param from state
    const param = paramHelpers.paramReducer(this.props.state, this.props.parameterId);
    // get value from param
    let value = param.value;
    // get the specific float we're editing
    let valuePart = value[this.mousemovelistenerIndex] || 0.0;
    // get min/max bounds
    const min = (param.min || [])[this.mousemovelistenerIndex];
    const max = (param.max || [])[this.mousemovelistenerIndex];

    // calculate mouse sensitivity
    let sensitivity = Math.min(0.1, Math.abs((max || 1000.0)-(min || 0.0))*0.01);
    // apply changes to float
    valuePart = valuePart + sensitivity * event.movementX;
    // apply min/max bounds
    if(min !== undefined)
      valuePart = Math.max(min, valuePart);
    if(max !== undefined)
      valuePart = Math.min(max, valuePart);

    // perform state-update action
    value[this.mousemovelistenerIndex] = valuePart;
    this.props.actions.setParamValueManual(this.props.parameterId, value);
  }
}
