import React, { PropTypes } from 'react';

class GroupHeaderView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    groupId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { state } = this.props;
    const group = (state.groups || {})[this.props.groupId];

    return (
      <span><a href="#" onClick={(e) => this.onClick(e)}>{group.name}</a></span>
    );
  }

  onClick(e){
    this.props.actions.setUiGroup(this.props.groupId);
  }
}

export default GroupHeaderView;
