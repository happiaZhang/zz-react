/**
 * Created by happia.zhang on 2017/8/10.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {buildRoot} from './sagaBuilder';
import {buildReducer} from './reducerBuilder';

class App {
  use(reducers, sagas) {
    const middlewareArr = [];
    const sagaMiddleware = createSagaMiddleware();
    let composeEnhancer = compose;
    middlewareArr.push(sagaMiddleware);
    if (process.env.NODE_ENV === 'development') {
      let {createLogger} = require('redux-logger');
      middlewareArr.push(createLogger({
        level: 'log',
        duration: false,
        timestamp: true,
        logger: console,
        logErrors: true,
        diff: true
      }));
    }
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancer;
    const enhancer = composeEnhancer(applyMiddleware(...middlewareArr));
    const finalCreateStore = compose(enhancer)(createStore);
    this.store = finalCreateStore(buildReducer(reducers), window.__INITIAL_STATE__);
    sagaMiddleware.run(buildRoot(sagas));
  }

  useModels(models) {
    this.use(models, models);
    return this;
  }

  useRoutes(routes) {
    this.routes = routes;
    return this;
  }

  start(node) {
    const rootElement = document.getElementById(node);
    ReactDOM.render(
      <Provider store={this.store}>
        <div style={{height: '100%'}}>
          {this.routes}
        </div>
      </Provider>, rootElement);
  }
}

export default App;
