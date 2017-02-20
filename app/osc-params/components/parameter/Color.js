import React, { PropTypes } from 'react';
import Base from './Base';
import styles from './Parameter.css';

/* reducers */
const paramValueReducer = (state, path) => {
  return state.parameters[path].value;
}

export default class Color extends Base {
  renderParam(param) {
    const labels = ['R', 'G', 'B', 'A'];

    return (
      <div className="param color">
        {param.value.map((attr,idx) =>
          <div key={idx} className={styles.container} onMouseDown={(e) => this.onMouseDown(idx, e)} onMouseUp={(e) => this.onMouseUp(e)}>
            <label>{param.name} ({labels[idx]})</label><input value={param.value[idx]} readOnly="readOnly" />
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
    let sensitivity = 1.0;
    let value = paramValueReducer(this.props.state, this.props.parameterId);
    value[this.mousemovelistenerIndex] = parseFloat(value[this.mousemovelistenerIndex]) + sensitivity * event.movementX;
    this.props.actions.setParamValueManual(this.props.parameterId, value);
  }
}
