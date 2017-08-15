/**
 * Created by happia.zhang on 2017/8/10.
 */
import React from 'react';
import {Form, Input, Button, Checkbox, Icon} from 'antd';
import {isNil} from '../utilities/is';
import '../themes/Login.less';

const {Component} = React;
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(this.state).find(k => nextState[k] !== this.state[k]);
    return !isNil(stateKey);
  }

  handleSubmit = () => {
    const {username, password} = this.state;
    console.log(username);
    console.log(password);
  };

  handleChange = (k, e) => {
    this.setState({[k]: e.target.value});
  };

  render() {
    const {username, password} = this.state;
    return (
      <div className='bond-login'>
        <Form className='login-form'>
          <FormItem>
            <Input
              prefix={<Icon type='user' style={{ fontSize: 13 }} />}
              placeholder='Username'
              value={username}
              onChange={this.handleChange.bind(this, 'username')}
              onPressEnter={this.handleSubmit}
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
              type='password'
              placeholder='Password'
              value={password}
              onChange={this.handleChange.bind(this, 'password')}
              onPressEnter={this.handleSubmit}
            />
          </FormItem>
          <FormItem>
            <Checkbox checked>Remember me</Checkbox>
            <Button type='primary' className='login-form-button' onClick={this.handleSubmit}>登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Login;
