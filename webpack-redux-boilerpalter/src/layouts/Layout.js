import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRootData } from '../actions';
import 'ie-placeholder';
import Header from './Header';
import LeftMenu from './LeftMenu/';
import '../static/style/common.css';
import '../static/style/iconfont/iconfont.css';
import css from './Layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.handleFresh = this.handleFresh.bind(this);
  };
  componentDidMount() {
    this.handleFresh();
  };
  handleFresh() {
    this.props.fetchRootData();
  };
  render() {
    const {children, rootData} = this.props;
    if (rootData.isFetching) {
      return (
        <div>
          加载中…
        </div>
      );
    } else if (rootData.success) {
      return (
        <div className={css.root}>
          <Header data={rootData.obj} />
          <div className={css.leftmenu}>
            <LeftMenu data={rootData.obj} />
          </div>
          <div className={css.main}>
            {children}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>加载失败……</p>
          <p>{rootData.error.message}</p>
          <p>{rootData.error.stack}</p>
          <a onClick={this.handleFresh} >点我重新加载</a>
        </div>
      );
    };
  };
};

const mapDispatchtoProps = {
  fetchRootData
};

const mapStateToProps = state => ({
  rootData: state.rootData
});

export default connect(mapStateToProps, mapDispatchtoProps)(Layout);
