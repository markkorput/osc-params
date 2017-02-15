import React, { PropTypes } from 'react';
import styles from './ParameterView.css';

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
      <div className={styles.container}>
        <label>{param.name}</label><input value={param.value || ''} readOnly="readOnly" />
      </div>
    );
  }
}

export default ParameterView;
