import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middleware = [ thunk ]

module.exports = () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(...middleware)
    )
  );

  return store;
};
