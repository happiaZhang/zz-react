import React, {Component} from 'react';
import {Input} from 'antd';

const genFormGroup = (WrappedComponent, label) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.value
      };
    }

    componentWillMount() {
      console.log('componentWillMount');
    }

    componentDidMount() {
      console.log('componentDidMount');
    }

    render() {
      return (
        <div className='form-group'>
          <label>{label}</label>
          <WrappedComponent defaultValue={this.state.value} />
        </div>
      );
    }
  };
};

const InputGroup = genFormGroup(Input, '债券简称');

export default function() {
  return (
    <div style={{width: 350, margin: '16px auto 0'}}>
      <InputGroup value='17熊猫债' />
    </div>
  );
}
