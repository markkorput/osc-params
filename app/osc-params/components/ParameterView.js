import React, { PropTypes } from 'react';
import styles from './ParameterView.css';

/* reducers */
const paramValueReducer = (state, path) => {
  return state.parameters[path].value;
}

class ParameterView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    parameterId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { state, parameterId } = this.props;
    const param = state.parameters[parameterId];

    if(!param){
      return (<label>parameter info not available</label>);
    }

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

export default ParameterView;
