import React from 'react';
import { render } from 'react-dom';
import createStore from './store/createStore';
import AppContainer  from './containers/AppContainer';

const store = createStore();
render(
  <AppContainer store={store} />,
  document.getElementById('app')
)
