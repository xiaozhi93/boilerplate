/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import Msg from '../../components/Modal/msg';

import style from './assets/SetMemberAttrDialog.css';

const cs = ClassNames.bind(style);

class SetMemberAttrDialog extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      isWeChatFieldShow: false,
      customAttrName: '',
      isMsgShow: false,
      msgText: ''
    };
    this.handleCustomAttrShow = this.handleCustomAttrShow.bind(this);
    this.handleCustomAttrAdded = this.handleCustomAttrAdded.bind(this);
    this.handleDelteCustomAttr = this.handleDelteCustomAttr.bind(this);
  }
  componentWillReceiveProps(nextState) {
    const { contactExtension } = nextState;
    if (contactExtension.success) {
      this.setState({
        customAttrName: ''
      });
    }
  }
  handleCustomAttrShow(e, type, exten) {
    this.props.handleContactExtension({
      id: e.target.value,
      isExten: exten ? true : false,
      showType: e.target.checked ? '1' : '0',
      whereShow: type ? '1' : '0',
      type: 'show'
    });
  }
  handleCustomAttrAdded(){
    const name = this.state.customAttrName.replace(/^\s*|\s*$/g, '');
    if (!name) {
      this.setState({
        isMsgShow: true,
        msgText: '请输入自定义字段名称'
      });
      return;
    }
    const { obj } = this.props.contactExtension;
    if (obj.exten.length === 20) {
      this.setState({
        isMsgShow: true,
        msgText: '自定义字段个数不能超过20个'
      });
      return;
    }
    const curAttrs = obj.fixed.concat(obj.exten);
    const isExist = curAttrs.find(item=>{
      if (item.name === name) {
        return true;
      }
    });
    if (isExist) {
      this.setState({
        isMsgShow: true,
        msgText: '自定义属性名称已经存在啦'
      });
      return;
    }
    this.props.handleContactExtension({
      name: name,
      type: 'add'
    });
  }
  handleDelteCustomAttr(e) {
    const id = e.target.getAttribute('data-id');
    this.props.handleContactExtension({
      id: id,
      type: 'delete'
  });
  }
  render() {
    const { obj } = this.props.contactExtension;
    return (
      <div className={style.main}>
        <Msg visible={this.state.isMsgShow} onClose={()=>this.setState({isMsgShow: false})}>{this.state.msgText}</Msg>
        <div className="tabs">
          <a
            className={cs('tab', {'cur': !this.state.isWeChatFieldShow})}
            onClick={()=>this.setState({isWeChatFieldShow: false})}
          >
            管理后台显示
          </a>
          <a
            className={cs('tab', {'cur': this.state.isWeChatFieldShow})}
            onClick={()=>this.setState({isWeChatFieldShow: true})}
          >
            我的名片显示
          </a>
        </div>
        <div className={cs('tabCont', {'active': !this.state.isWeChatFieldShow})}>
          <p className={style.tabContTitle}>勾选的属性将显示在后台通讯录列表中</p>
          <div className={style.defaultAttr}>
            <ul>
              {obj.fixed && obj.fixed.map((item, i) => (
                <li key={i}>
                  <label>
                    <input
                      value={item.id}
                      type="checkbox"
                      disabled={item.readyOnly}
                      defaultChecked={item.manageShow}
                      onChange={this.handleCustomAttrShow}
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.customAttr}>
            <ul>
              {obj.exten && obj.exten.map((item, i) => (
                <li key={i}>
                  <label>
                    <input
                      value={item.id}
                      type="checkbox"
                      defaultChecked={item.manageShow}
                      onChange={(e) => this.handleCustomAttrShow(e, 0, 1)}
                    />
                    {item.name}
                  </label>
                  <a
                    onClick={this.handleDelteCustomAttr}
                    data-id={item.id}
                  >
                    删除
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.addAttr}>
            <input
              type="text"
              value={this.state.customAttrName}
              placeholder="请输入自定义属性名称"
              maxLength="8"
              onChange={(e) => this.setState({customAttrName: e.target.value})}
            />
            <a className={style.btn} onClick={this.handleCustomAttrAdded}>添加自定义属性</a>
          </div>
        </div>
        <div className={cs('tabCont', {'active': this.state.isWeChatFieldShow})}>
          <p className={style.tabContTitle}>勾选的属性将显示在我的名片中</p>
          <div className={style.defaultAttr}>
            <ul>
              {obj.fixed && obj.fixed.map((item, i) => (
                <li key={i}>
                  <label>
                    <input
                      value={item.id}
                      type="checkbox"
                      disabled={item.readyOnly}
                      defaultChecked={item.weChatShow}
                      onChange={(e)=>this.handleCustomAttrShow(e, 1)}
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.customAttr}>
            <ul>
              {obj.exten && obj.exten.map((item, i) => (
                <li key={i}>
                  <label>
                    <input
                      value={item.id}
                      type="checkbox"
                      defaultChecked={item.weChatShow}
                      onChange={(e)=>this.handleCustomAttrShow(e, 1, 1)}
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SetMemberAttrDialog;
