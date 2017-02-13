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
      <li className="parameter">
        {param
          ? <label>{param.name} <input type="text" defaultValue={param.value || ''} /></label>
          : <label>parameter info not available</label>}
      </li>
    );
  }
}

export default ParameterView;
