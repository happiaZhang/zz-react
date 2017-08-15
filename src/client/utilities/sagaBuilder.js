import {fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {fetch} from './fetch';

export function buildRoot(options) {
  const sagaArr = [];
  for (let key in options) {
    let value = options[key];
    if (value instanceof Array) {
      for (let item of value) {
        item.url && sagaArr.push(createSaga(item));
      }
    } else {
      value.url && sagaArr.push(createSaga(value));
    }
  }
  return function* () {
    for (let saga of sagaArr) {
      yield fork(saga);
    }
  };
}

function bodyHandler(data, type, method) {
  if (method !== 'get' && data) {
    if (type === 'json') {
      return JSON.stringify(data);
    } else if (type === 'from') {
      let pairs = [];
      for (let key of data) {
        pairs.push(key + '=' + data[key]);
      }
      return pairs.join('&');
    }
  }
  return data;
}

export function createSaga(item) {
  return function* () {
    let take = item.takeEvery ? takeEvery : takeLatest;
    yield take(item.action, function* ({payload}) {
      let result;
      try {
        let type = item.type || 'json';
        let bodyParser = item.body || bodyHandler;
        result = yield fetch(item.url(payload), createOptions(item.method, type, item.headers, bodyParser(payload, type, item.method)));
      } catch (error) {
        console.log(error);
        result = {success: false, errMessage: '服务端连接异常'};
      }
      if (result.success) {
        yield put({type: `${item.action}_SUCCESS`, result: result.content, payload});
      } else {
        yield put({type: `${item.action}_FAIL`, error: result.errMessage, payload});
      }
    });
  };
}

function createOptions(method, type, extHeaders, payload) {
  let options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': type === 'json' ? 'application/json' : 'application/x-www-form-urlencoded'
    }
  };
  options.headers = extHeaders || options.headers;
  if (method !== 'get') {
    options.body = payload;
  }
  return options;
}
