/**
 * Copyright @2016-present, Sumscope, Inc.
 * All rights reserved.
 */
import React from 'react';
import {shouldUpdate} from './utils/reactUtil';

export default class extends React.Component {
  componentWillReceiveProps(nextProps) {
    Object.keys(nextProps || {}).filter(prop => this.props[prop] !== nextProps[prop])
      .forEach(prop => this.onPropChange(prop, nextProps[prop]));
  }

  onPropChange(propKey, nextProp) {
    // override
  }

  shouldComponentUpdate() {
    return shouldUpdate.apply(this, arguments);
  }
}
