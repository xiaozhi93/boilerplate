import React, { Component } from 'react';
import { Link } from 'react-router';
import {Modal, Msg } from '../../../components/Modal';
import DropDown from '../../../components/DropDown';
import SetMemberAttrDialog from '../SetMemberAttrDialog';
import MemberDialog from './MemberDialog';
import css from './assets/ActiveBar.css';

export default class ActiveBar extends Component {
  constructor (props){
    super(props);
    this.state = {
      modal: false,
      msg: false,
      showField: false
    };
    this.showAddMember = this.showAddMember.bind(this);
    this.showField = this.showField.bind(this);
  }
  showAddMember() {
    const { obj } = this.props.contactExtension;
    this.setState({
      modal: true,
      msg: true
    });
  };
  showField() {
    this.setState({
      showField: true
    });
  };
  render() {
    const { contactExtension } = this.props;
    const addPersonDialog = (
      (this.state.modal && !contactExtension.isFetching && contactExtension.success)
      ? <Modal
          visible
          width={600}
          height={520}
          onClose={()=>this.setState({modal:false})}
          title={'添加成员'}
          btn={['保存','保存并添加下一个']}
        >
          <MemberDialog {...this.props} />
        </Modal>
      : null
    )
    return(
      <div className={css.header}>
        <a
          className={`${'btn btn-primary'} ${css.abtn}`}
          onClick={this.showAddMember}
        >
          添加成员
        </a>
        <Link
          className={`${'btn btn-primary'} ${css.abtn}`}
          to="contact/import"
        >
          批量导入/导出
        </Link>
        <Link
          className={`${'btn btn-primary'} ${css.abtn}`}
          to="contact/sync"
        >
          同步成员
        </Link>
        <a className={`${'btn btn-primary'} ${css.abtn}`}>移动成员</a>
        <DropDown
          className={'btn btn-primary'}
          btnText={'更多▼'}
          items={[
            {text: '显示设置',onClick:(this.showField)},
            {text:'设为离职'},
            {text:'删除成员'}
          ]}
        />
        <a
          className="help-link"
          href="http://www.51vj.cn/helps/helps_list_51.html"
        >
          <span
            className="iconfont"
            style={{color:'#bdc4cb'}}
          >
            &#xe622;
          </span>
          使用帮助
        </a>
        {addPersonDialog}
        <Modal
            title="编辑显示内容"
            visible={this.state.showField}
            onClose={()=>this.setState({showField: false})}
            width={600}
            height={500}
            >
            <SetMemberAttrDialog {...this.props} />
        </Modal>
      </div>
    );
  };
};
