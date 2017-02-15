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

    return (
      <div className="parameter">
        {param
          //? <label>{param.name} <input type="text" value={param.value || ''} /></label>
          ? <label><strong>{param.name}</strong> {param.value || ''}</label>
          : <label>parameter info not available</label>}
      </div>
    );
  }
}

export default ParameterView;
