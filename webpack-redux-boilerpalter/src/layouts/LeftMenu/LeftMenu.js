import React, { Component } from 'react';
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import css from './Leftmenu.css';

class UnUse extends Component{
  render() {
    const items = this.props.items
    return (
      <div className={css.unuse}>
        <p className={css.untitle}>未安装的应用</p>
        <ul>
          {items.map((item, i) =>
            <li
              className={css.unitem}
              key={i}
              onClick={()=>alert(item.id)}
            >
              {item.name}
            </li>
          )}
        </ul>
      </div>
    );
  };
};

class ThreeMenu extends Component{
  render() {
    const items  = this.props.items;
    const data   = this.props.data;
    const addCur = this.props.addCur;
    const height = this.props.open ? items.length * 35 : 0;
    return (
      <ul
        className={css.three}
        style={{height: height}}
      >
        {(items && items.length > 0) && items.map((item, i) =>
          <li
            className={css.threeitem}
            key={i}
          >
            <Link
              className={`${css.threelink} ${item.id == data.active ? css.current : ''}`}
              to={item.toUrl}
              onClick={addCur.bind(this, {switchOne:data.switchOne,switchTwo:data.switchTwo,active:item.id})}
            >
              {item.name}
            </Link>
          </li>
        )}
      </ul>
    );
  };
};

class TwoMenu extends Component{
  render() {
    const data    = this.props.data;
    const items   = this.props.items;
    const switchs = this.props.switchs;
    const addCur  = this.props.addCur;
    const height  = this.props.open ? data.switchTwo ? 'inherit' : items.length * 40 :  '';
    return (
      <ul
        className={css.two}
        style={{height: height}}
      >
        {(items && items.length > 0) && items.map((item, i) =>
          <li
            className={css.twoitem}
            key={i}
          >
            <Link
              className={`${css.twolink} ${item.id == data.active ? css.current : (item.id == data.switchTwo ? css.cur : '')}`}
              to={!item.isParent ? item.toUrl: ""}
              onClick={item.isParent ? switchs.bind(this, {switchOne:data.switchOne,switchTwo:item.id}) : addCur.bind(this, {switchOne:data.switchOne,switchTwo:'',active:item.id})}
            >
              {item.isParent ? (<span className={`${css.arrow} ${'iconfont'}`}>&#xe631;</span>): ''}
              {item.name}
            </Link>
            <ThreeMenu
              data={data}
              items={item.children}
              addCur={addCur}
              open={item.id == data.switchTwo ? true : false}
            />
          </li>
        )}
      </ul>
    );
  };
};

class LeftMenu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      switchOne: '',
      switchTwo: '',
      active: ''
    };
  };
  switchs(obj) {
    this.setState({
      switchOne: obj.switchOne,
      switchTwo: obj.switchTwo
    });
  };
  addCur(obj) {
    this.setState({
      switchOne: obj.switchOne,
      switchTwo: obj.switchTwo,
      active: obj.active
    });
  };
  render() {
    const { data } = this.props;
    const use = data.installed;
    const unuse = data.unInstalled;
    return (
      <Scrollbars className={css.main}>
        <ul
          className={css.use}
          ref="mian"
        >
          {(use && use.length > 0) && use.map((item, i) =>
            <li
              className={css.oneitem}
              key={i}
            >
              <Link
                className={`${css.onelink} ${item.id == this.state.active ? css.current : (item.id == this.state.switchOne ? css.cur : '')}`}
                to={!item.isParent ? item.toUrl: ""}
                onClick={item.isParent ? this.switchs.bind(this, {switchOne:item.id}) : this.addCur.bind(this, {switchOne:'',switchTwo:'',active:item.id})}
              >
                {item.isParent ? (<span className={`${css.arrow} ${'iconfont'}`}>&#xe631;</span>): ''}
                {item.name}
              </Link>
              <TwoMenu
                data={this.state}
                items={item.children}
                switchs={this.switchs.bind(this)}
                addCur={this.addCur.bind(this)}
                open={item.id == this.state.switchOne ? true : false}
              />
            </li>
          )}
        </ul>
        <UnUse items={unuse} />
      </Scrollbars>
    );
  };
};

export default LeftMenu;
