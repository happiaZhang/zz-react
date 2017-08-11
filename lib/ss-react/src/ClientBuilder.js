/**
 * Copyright @2016-present, Sumscope, Inc.
 * All rights reserved.
 */

import ClientApp from './ClientApp';

export default class ClientBuilder {
  constructor() {
    this.options = {};
  }

  static react() {
    return new ClientBuilder();
  }

  env(env) {
    this.options.env = env;
    return this;
  }

  routes(routes) {
    this.options.routes = routes;
    return this;
  }

  reducer(reducer) {
    this.options.reducer = reducer;
    return this;
  }

  sagas(sagas) {
    this.options.sagas = sagas;
    return this;
  }

  logger(options) {
    this.options.logger = options;
    return this;
  }

  buildSagas(options) {
    this.options.sagasOptions = options;
    return this;
  }

  rootElement(element) {
    this.options.rootElement = element;
    return this;
  }

  build() {
    return new ClientApp(this.options);
  }
}
