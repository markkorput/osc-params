import React from 'react';
import Base from './Base';
import Number from './Number';
import Color from './Color';
import Point from './Point';
import styles from './Parameter.css';

export default class ParameterView extends Base {
  renderParam(param) {
    switch(param.type){
      case 'color': return(<Color {...this.props} />);
      case 'point': return(<Point {...this.props} />);
    };

    return (<Number {...this.props} />);
  }
}
