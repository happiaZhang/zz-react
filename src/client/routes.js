/**
 * Created by happia.zhang on 2017/8/10.
 */
import {BrowserRouter, Route} from 'react-router-dom';
import {React} from 'ss-react';
import Login from './containers/Login';

const Routes = (
  <BrowserRouter>
    <div>
      <Route path='/' component={Login} />
    </div>
  </BrowserRouter>
);

export default Routes;
