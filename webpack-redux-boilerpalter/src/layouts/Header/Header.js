import React, { Component } from 'react';
import { Link } from 'react-router';
import css from './assets/Header.css';

class Header extends Component{
  render() {
    const homePage = this.props.data.homePage;
    const logOutUrl = homePage + this.props.data.logOutUrl;
    const companyName = this.props.data.companyName;
    return(
      <div className={css.header}>
        <a
          className={css.link}
          href={homePage}
        ></a>
        <div className={css.info}>
          <Link
            className={css.item}
            to="/index"
          >
            首页
          </Link>
          <Link
            className={css.item}
            to="/app"
          >
            应用中心
          </Link>
          <Link
            className={css.item}
            to="/help"
          >
            帮助
          </Link>
          <Link className={css.name}>
            {companyName}
          </Link>
          <a
            className={css.item}
            href={logOutUrl}
          >
            退出
          </a>
          <a
            className={`${'btn btn-success'} ${css.toindex}`}
            href={homePage}
          >
            回到官网
          </a>
        </div>
      </div>
    );
  };
};

export default Header;
