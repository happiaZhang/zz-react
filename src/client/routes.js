/**
 * Created by happia.zhang on 2017/8/10.
 */
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import Login from './containers/Login';
import Message from './containers/Message';

const Routes = (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Login} />
      <Route exact path='/message' component={Message} />
    </div>
  </BrowserRouter>
);

export default Routes;
