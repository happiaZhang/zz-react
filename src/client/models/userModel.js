/**
 * Created by happia.zhang on 2017/8/15.
 */
import * as Types from '../constants/ActionType';
export default [
  {
    key: 'user.auth',
    action: Types.LOGIN,
    initialState: {
      username: '',
      password: ''
    },
    method: 'post',
    url: () => '/api/iam/oauth/token'
  }
];
