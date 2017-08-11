import {message} from 'antd';

export function onReceive({key, nextProps, filter, loading, success, successAlert = false, fail, failAlert = true}) {
  if (this.props[key] === nextProps[key]) {
    return;
  }
  let prop = nextProps[key];
  if (filter && !filter(prop)) return;
  if (prop.loading) {
    let state = loading ? loading(prop) : {loading: true};
    if (state) {
      this.setState(state);
    }
  } else if (prop.success) {
    let state = success ? success(prop) : {loading: false};
    if (state && state.abort) return;
    successAlert && message.success(typeof successAlert === 'string' ? successAlert : '操作成功', 3);
    state && this.setState(state);
  } else if (!prop.success) {
    let state = fail ? fail(prop) : {loading: false};
    if (state && state.abort) return;
    failAlert && message.error(prop.error || (typeof failAlert === 'string' ? failAlert : '操作失败'), 3);
    state && this.setState(state);
  }
}

export function shouldUpdate() {
  return shouldPropsUpdate.apply(this, arguments) || shouldStateUpdate.apply(this, arguments);
}

export function shouldPropsUpdate(nextProps) {
  return Object.keys(nextProps || {}).some((prop) => nextProps[prop] !== this.props[prop]);
}

export function shouldStateUpdate(nextProps, nextState) {
  return Object.keys(nextState || {}).some((state) => nextState[state] !== this.state[state]);
}
