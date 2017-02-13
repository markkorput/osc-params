import React, { PropTypes } from 'react';
import ParameterView from '../components/ParameterView';

class GroupView extends React.Component {
  static propTypes = {
    parameters: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {

    return (
      <ul className='group'>
        <li><strong>Group name here</strong></li>
        {this.props.layout.map(item =>
          Array.isArray(item)
            ? <GroupView parameters={this.props.parameters} actions={this.props.actions} layout={item} />
            : <ParameterView parameter={this.props.parameters[item]} actions={this.props.actions} />
        )}
      </ul>
    );
  }
}

export default GroupView;
