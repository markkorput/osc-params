import React, { PropTypes } from 'react';
import * as uiReducers from '../reducers/uiHelpers.js';

class GroupHeaderView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    uiState: PropTypes.object.isRequired,
    groupId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { state, uiState, groupId } = this.props;
    const group = (state.groups || {})[groupId];

    return (
      <span>
        <a href="#" onClick={(e) => this.onClick(e)} className="name">
          {group.name}
        </a>
        <a href="#" onClick={(e) => this.onToggle(e)} className="collapse">
          {uiReducers.uiGroupVisiblityReducer(uiState, groupId)
            ? '-' : '+'
          }
        </a>
      </span>
    );
  }

  onClick(e){
    e.preventDefault();
    this.props.actions.setUiGroup(this.props.groupId);
  }

  onToggle(e){
    const {groupId, uiState, actions} = this.props;

    e.preventDefault();

    actions.setUiGroupVisibility(
      groupId,
      (uiReducers.uiGroupVisiblityReducer(uiState, groupId) === false));
  }
}

export default GroupHeaderView;
