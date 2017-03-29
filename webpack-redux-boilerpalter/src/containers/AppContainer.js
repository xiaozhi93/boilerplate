import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import RouteConfig from '../routes';

class AppContainer extends Component{
  render(){
    const { store } = this.props;
    return(
      <Provider store={store}>
        <Router
          history={hashHistory}
          routes={RouteConfig}
        />
      </Provider>
    );
  };
};

export default AppContainer;
