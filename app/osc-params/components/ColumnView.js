import React, { PropTypes } from 'react';
import GroupHeaderView from './GroupHeaderView';
import ParameterView from './parameter/Parameter';

class ColumnView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { state, actions } = this.props;
    const rootGroupItem = (state.groups || {})[state.rootGroupId];

    if(!rootGroupItem){
      return (<ul className='group'><li>No group</li></ul>);
    }

    const uiItems = this._uiItems(rootGroupItem);

    return (
      <ul className="column-view">
        {uiItems.map(item =>
            <li className={(item.type == 'group' ? 'group' : 'param')} key={item.id}>
              {item.type == 'group'
                ? <GroupHeaderView key={item.id} groupId={item.id} state={state} />
                : <ParameterView key={item.id} parameterId={item.id} state={state} actions={actions} />}
            </li>
        )}
      </ul>
    );
  }

  _uiItems(groupItem) {
    const { state } = this.props;

    if(!groupItem){
      return [];
    }

    let items = [{
      type: 'group',
      id: groupItem.id
    }];

    for(const item of groupItem.items || []){
      if(item.type == 'group'){
        items = [
          ...items,
          ...this._uiItems(state.groups[item.id])
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
