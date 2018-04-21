import './Root.less';
import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import Login from './Login';
import Hoc from './Hoc';

const CONFIG_ROUTES = [
  {path: '/', component: Login},
  {path: '/hoc', component: Hoc}
];

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home'
    };
  }

  handleClick = (e) => {
    this.setState({current: e.key});
  };

  renderRoutes = () => {
    return CONFIG_ROUTES.map(({path, component}) => {
      return <Route key={path} path={path} component={component} exact />;
    });
  };

  render() {
    return (
      <div className='zz-wrapper'>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode='horizontal'>
          <Menu.Item key='home'>
            <Icon type='appstore' />
            <Link to='/'>首页</Link>
          </Menu.Item>
          <Menu.Item key='hoc'>
            <Icon type='bulb' />
            <Link to='/hoc'>高阶组件</Link>
          </Menu.Item>
        </Menu>
        {this.renderRoutes()}
      </div>
    );
  }
}

export default Root;
