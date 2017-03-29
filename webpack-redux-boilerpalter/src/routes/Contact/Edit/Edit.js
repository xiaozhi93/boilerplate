import React, { Component } from 'react'

import TitleBar from '../TitleBar';
import Ztree from '../../../components/Ztree';

import { Modal, Msg } from '../../../components/Modal';

import css from './assets/Edit.css';


class Edit extends Component{
  constructor(props) {
    super(props);
    this.state = {
      msg: false,
      msgText: ''
    }
    this.add = this.add.bind(this);
  };
  add() {
    this.setState({
      msg: true,
      msgText: '请选择部门'
    });
  };
  render(){
    return(
      <div>
        <TitleBar title="编辑部门" />
        <div className={css.editMain}>
          <div className={css.editBar}>
            <a
              className="btn btn-primary"
              onClick={this.add}
            >
              添加
            </a>
            <a className="btn btn-primary">编辑</a>
            <a className="btn btn-primary">上移</a>
            <a className="btn btn-primary">下移</a>
            <a className="btn btn-primary">删除</a>
            <a className="btn btn-primary">可见范围设置</a>
          </div>
          <Ztree
            setting={{
              url: '/api/departemt'
            }}
            checkStrictly
            checkable
            radio
            draggable
          />
        </div>
        <Msg
          visible={this.state.msg}
          onClose={()=>this.setState({msg: false})}
        >
          {this.state.msgText}
        </Msg>
      </div>
    );
  };
};

export default Edit;
