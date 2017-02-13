import React, { PropTypes } from 'react';

class ParameterView extends React.Component {
  static propTypes = {
    parameter: PropTypes.object,
    actions: PropTypes.object.isRequired
  };

  render() {
    const parameter = this.props.parameter;

    return (
      <li className="parameter">
        {parameter
          ? <label>{parameter.name} <input type="text" defaultValue={parameter.value || ''} /></label>
          : <label>parameter info not available</label>}
      </li>
    );
  }
}

export default ParameterView;
