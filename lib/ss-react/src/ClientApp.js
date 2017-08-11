/**
 * Created by Administrator on 2016/11/11.
 */

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {buildRoot} from './utils/sagaBuilder';
import {buildReducer} from './utils/reducerBuilder';
import _ from 'lodash';

export default class ClientApp {
  constructor(options) {
    this.createStore(options);
    this.options = options;
  }

  createStore(options) {
    const middlewareArr = [];
    const sagaMiddleware = createSagaMiddleware();
    let composeEnhancer = compose;
    middlewareArr.push(sagaMiddleware);
    if (options.env === 'development') {
      let {createLogger} = require('redux-logger');
      let loggerOptions = {
        level: 'log',
        duration: false,
        timestamp: true,
        logger: console,
        logErrors: true,
        diff: true
      };
      if (options.logger && options.logger.actions) {
        let enable = options.logger.enable;
        let all = _.includes(options.logger.actions, 'ALL');
        loggerOptions.predicate = (getState, action) => enable && (all || _.includes(options.logger.actions, action.type));
      }
      middlewareArr.push(createLogger(loggerOptions));
    }
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancer;
    const enhancer = composeEnhancer(applyMiddleware(...middlewareArr));
    const finalCreateStore = compose(enhancer)(createStore);
    this.store = finalCreateStore(buildReducer(options.reducer), window.__INITIAL_STATE__);
    sagaMiddleware.run(buildRoot(options.sagas));
  }

  start() {
    let rootElement = this.options.rootElement || document.getElementById('app');
    ReactDOM.render(
      <Provider store={this.store}>
        <div style={{height: '100%'}}>
          {this.options.routes}
        </div>
      </Provider>,
      rootElement
    );
  }
}
