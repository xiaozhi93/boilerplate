import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

const logger = createLogger();
const middleware = [ thunk, logger ];

module.exports = () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(...middleware)
    )
  );

  return store;
};

