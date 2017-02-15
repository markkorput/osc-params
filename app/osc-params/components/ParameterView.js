import React, { PropTypes } from 'react';

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
      <div className="parameter">
        <label>{param.name}</label><span>{param.value || ''}</span>
      </div>
    );
  }
}

export default ParameterView;
