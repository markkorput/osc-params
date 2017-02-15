import React, { PropTypes } from 'react';

class GroupHeaderView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    groupId: PropTypes.string.isRequired
  };

  render() {
    const { state } = this.props;
    const group = (state.groups || {})[this.props.groupId];

    return (
      <span>{group.name}</span>
    );
  }
}

export default GroupHeaderView;
