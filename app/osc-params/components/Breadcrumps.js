import React, { PropTypes } from 'react';
import _ from 'lodash';

function getBreadCrumpArray(state, groupId){

}

class Breadcrumps extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { params, ui } = this.props.state;

    if(!ui.groupId){
      return(<ul id="breadcrumps"><li>No current group info</li></ul>);
    }

    const names = _.compact(ui.groupId.split('/'));

    let last = '';
    const hierarchy = names.map(name => {
      last = last+'/'+name;
      return last;
    });

    return (
      <ul id="breadcrumps">
        {hierarchy.map(id =>
          <li><a href="#" onClick={(e) => this.onBreadcrumpClick(e, id)}>{_.last(id.split('/'))}</a></li>
        )}
      </ul>
    );
  }

  onBreadcrumpClick(e, group_id){
    this.props.actions.setUiGroup(group_id);
  }
}

export default Breadcrumps;
