import React from 'react';
import Base from './Base';
import Number from './Number';
import Color from './Color';
import Point from './Point';
import Bool from './Bool';
import String from './String';
import styles from './Parameter.css';

export default class ParameterView extends Base {
  renderParam(param) {
    switch(param.type){
      case 'color': return(<Color {...this.props} />);
      case 'point': return(<Point {...this.props} />);
      case 'bool': return(<Bool {...this.props} />);
      case 'string': return(<String {...this.props} />);
    };

    return (<Number {...this.props} />);
  }
}
