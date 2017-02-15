import React, { PropTypes } from 'react';
import ParameterView from '../components/ParameterView';

class GroupView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    groupId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { state, actions } = this.props;
    const group = (state.groups || {})[this.props.groupId];

    if(!group){
      return (<ul className='group'><li>No group</li></ul>);
    }

    return (
      <ul className='group'>
        <li><strong>{group.name}</strong></li>
        {group.items.map(item =>
          <li className={styles.item}>
            {item.type == 'parameter'
              ? <ParameterView key={item.id} parameterId={item.id} state={state} actions={actions} />
              : <GroupView key={item.id} groupId={item.id} state={state} actions={actions} />}
          </li>)}
      </ul>
    );
  }
}

export default GroupView;
