import React, { Component } from 'react'
import Modal from '../../../components/Modal';
import Ztree from '../../../components/Ztree';
import { Scrollbars } from 'react-custom-scrollbars';

import css from './assets/MemberDialog.css';

class MemberDialog extends Component{
  constructor(props) {
    super(props)
    this.state = {
      showTabsIndex: 0,
      modal: false
    }
    this.handleClick = this.handleClick.bind(this);
  };
  componentDidMount() {
  };
  componentWillUnmount() {
  };
  handleClick(event){
    const key = event.target.name;
    this.setState({
      [key]: !this.state[key]
    });
  };
  render(){
    const { obj } = this.props.contactExtension;
    return(
      <div className={css.dialogCont}>
        <div className="tabs">
          <a className={`${'tab'} ${this.state.showTabsIndex == 0 ? 'cur' : ''}`}
            onClick={()=>this.setState({showTabsIndex:0})}>
            基本资料
          </a>
          <a className={`${'tab'} ${this.state.showTabsIndex == 1 ? 'cur' : ''}`}
            onClick={()=>this.setState({showTabsIndex:1})}>
            详细资料
          </a>
        </div>
        <div className={css.tabMains}>
          <Scrollbars>
            <div className={css.tabMain} style={{display:this.state.showTabsIndex == 0 ? 'block' : 'none'}}>
              <div className={css.topMain}>
                <div className={css.topMainLeft}>
                  <label className={css.inputLabel}>
                    <p className={css.tags}><span className="red">*</span>姓名：</p>
                    <div className={css.inputDiv}>
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="请输入姓名"
                        autoComplete="off"
                        onChange={this.handleInputChage} />
                    </div>
                  </label>
                  <label className={css.inputLabel}>
                    <p className={css.tags}><span className="red">*</span>手机号码：</p>
                    <div className={css.inputDiv}>
                      <input
                        type="text"
                        name="mobile"
                        value={this.state.mobile}
                        maxLength="11"
                        placeholder="请输入手机号"
                        autoComplete="off"
                        onChange={this.handleInputChage} />
                    </div>
                  </label>
                  <div className={css.inputLabel}>
                    <p className={css.tags}>性别：</p>
                    <div className={css.inputRadioDiv}>
                      <label className={css.inputRadioLabel}>
                        <input type="radio" name="gender" checked={this.state.gender == 0 ? true : false} onChange={()=>this.setState({gender:0})}/>
                        男
                      </label>
                      <label className={css.inputRadioLabel}>
                        <input type="radio" name="gender" checked={this.state.gender == 1 ? true : false} onChange={()=>this.setState({gender:1})}/>
                        女
                      </label>
                    </div>
                  </div>
                </div>
                <div className={css.topMainRight}>
                  <div className={css.defaultHeaderImg} style={this.state.logo ? {backgroundImage : 'url('+this.state.logo+')'} : {}}></div>
                  <a className={css.upHeadImg}>
                    编辑头像
                    <input className={css.upHeadImgInput} type="file"/>
                  </a>
                </div>
              </div>
              <label className={css.inputLabel}>
                <p className={css.tags}>电子邮箱：</p>
                <div className={css.inputDiv}>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="请输入电子邮箱"
                    autoComplete="off"
                    onChange={this.handleInputChage} />
                </div>
              </label>
              <label className={css.inputLabel}>
                <p className={css.tags}>微信号：</p>
                <div className={css.inputDiv}>
                  <input
                    type="text"
                    name="weChatId"
                    value={this.state.weChatId}
                    placeholder="请输入微信号"
                    autoComplete="off"
                    onChange={this.handleInputChage} />
                </div>
              </label>
              <label className={css.inputLabel}>
                <p className={css.tags}><span className="red">*</span>部门：</p>
                <div className={css.inputDiv}>
                  <input
                    type="text"
                    value={this.state.departNames}
                    name="showSelectDepartDialog"
                    placeholder="请选择部门"
                    autoComplete="off"
                    readOnly="true"
                    onClick={()=>this.setState({modal:true})} />
                </div>
              </label>
              <label className={css.inputLabel}>
                <p className={css.tags}>职位：</p>
                <div className={css.inputDiv}>
                  <input
                    type="text"
                    name="job"
                    value={this.state.job}
                    placeholder="请输入职位"
                    autoComplete="off"
                    onChange={this.handleInputChage} />
                </div>
              </label>
            </div>
            <div style={{display:this.state.showTabsIndex == 1 ? 'block' : 'none'}}>
              <label className={css.inputLabel}>
                <p className={css.tags}>员工生日：</p>
                <div className={css.inputDiv}>
                  <input
                    type="text"
                    name="birthday"
                    value={this.state.birthday}
                    placeholder="请输入员工生日"
                    autoComplete="off"
                    onChange={this.handleInputChage} />
                </div>
              </label>
              <div className={css.inputLabel}>
                <p className={css.tags}>生日提醒：</p>
                <div className={css.inputRadioDiv}>
                  <label className={css.inputRadioLabel}>
                    <input type="radio" name="notifyType" checked={this.state.notifyType == 0 ? true : false} onChange={()=>this.setState({notifyType:0})}/>
                    按阳历
                  </label>
                  <label className={css.inputRadioLabel}>
                    <input type="radio" name="notifyType" checked={this.state.notifyType == 1 ? true : false} onChange={()=>this.setState({notifyType:1})}/>
                    按阴历
                  </label>
                </div>
              </div>
              <label className={css.inputLabel}>
                <p className={css.tags}>入职日期：</p>
                <div className={css.inputDiv}>
                  <input
                    type="text"
                    name="employed"
                    value={this.state.employed}
                    placeholder="请输入入职日期"
                    autoComplete="off"
                    onChange={this.handleInputChage} />
                </div>
              </label>
              <div className={css.inputLabel}>
                <p className={css.tags}>是否隐藏此人：</p>
                <div className={css.inputRadioDiv}>
                  <label className={css.inputRadioLabel}>
                    <input type="radio" name="hidden" checked={this.state.hidden == 0 ? true : false} onChange={()=>this.setState({hidden:0})}/>
                    否
                  </label>
                  <label className={css.inputRadioLabel}>
                    <input type="radio" name="hidden" checked={this.state.hidden == 1 ? true : false} onChange={()=>this.setState({hidden:1})}/>
                    是
                  </label>
                </div>
              </div>
              {obj.exten.map((item, i)=>
                <label className={css.inputLabel} key={i}>
                  <p className={css.tags}>{item.name}：</p>
                  <div className={css.inputDiv}>
                    <input
                      type="text"
                      name={item.id}
                      value={this.state[item.id]}
                      placeholder={`${'请输入'}${item.name}`}
                      autoComplete="off"
                      onChange={this.handleInputChage} />
                  </div>
                </label>
              )}
            </div>
          </Scrollbars>
        </div>
        <Modal
          visible={this.state.modal}
          width={600}
          height={520}
          onClose={()=>{
            this.setState({modal:false})
          }}
          onOk={()=>{
            this.setState({modal:false})
            console.log(this.refs.tree.checked)
          }}
          title={'选择部门'}
          btn={['确定','取消']}
        >
          <Ztree
            setting={{
              url: '/api/departemt'
            }}
            checkable
            multiple
            checkStrictly={true}
            ref="tree"
          />
        </Modal>
      </div>
    );
  };
};




export default MemberDialog
