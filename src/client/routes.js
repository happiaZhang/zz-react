/**
 * Created by happia.zhang on 2017/8/10.
 */
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import Root from './containers/Root';

const Routes = (
  <BrowserRouter>
    <Route path='/' component={Root} />
  </BrowserRouter>
);

export default Routes;
