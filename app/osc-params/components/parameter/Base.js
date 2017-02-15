import React, { PropTypes } from 'react';
import styles from './Base.css';

export default class Base extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    parameterId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { state, parameterId } = this.props;
    const param = state.parameters[parameterId];

    if(!param){
      return this.renderNotFound();
    }

    return this.renderParam(param);
  }

  renderParam(param){
    return(
      <div className={styles.container}>
        <label>{param.name}</label><input value={param.value || ''} readOnly="readOnly" />
      </div>
    );
  }

  renderNotFound(){
    return (<label>parameter not fond</label>);
  }
}
