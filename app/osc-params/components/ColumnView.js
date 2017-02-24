import React, { PropTypes } from 'react';
import GroupHeaderView from './GroupHeaderView';
import ParameterView from './parameter/Parameter';
import * as paramHelpers from '../reducers/paramHelpers';
import * as uiHelpers from '../reducers/uiHelpers';

class ColumnView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    uiState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    groupId: PropTypes.string
  };

  render() {
    const { state, actions, uiState } = this.props;
    const rootGroupItem = (state.groups || {})[this.props.groupId || state.rootGroupId];

    if(!rootGroupItem){
      return (<ul className='group'><li>No group</li></ul>);
    }

    const uiItems = this._visibleUiItems(rootGroupItem);

    return (
      <ul className="column-view">
        {uiItems.map(item =>
            <li className={(item.type == 'group' ? item.type : 'param type-'+paramHelpers.paramReducer(state, item.id).type)} key={item.id}>
              {item.type == 'group'
                ? <GroupHeaderView key={item.id} groupId={item.id} state={state} uiState={uiState} actions={actions} />
                : <ParameterView key={item.id} parameterId={item.id} state={state} actions={actions} />}
            </li>
        )}
      </ul>
    );
  }

  _visibleUiItems(groupItem) {
    const { state, uiState } = this.props;

    if(!groupItem){
      return [];
    }

    let items = [{
      type: 'group',
      id: groupItem.id
    }];

    if(uiHelpers.uiGroupVisiblityReducer(uiState, groupItem.id) !== true){
      return items;
    }

    for(const item of groupItem.items || []){
      if(item.type == 'group'){
        items = [
          ...items,
          ...this._visibleUiItems(state.groups[item.id])
        ]
      } else {
        items.push({
          type: 'parameter',
          id: item.id});
      }
    }

    return items;
  }
}

// the Dimensions wrapper give the ColumnView component
// containerWidth and containerHeight properties
export default ColumnView;
