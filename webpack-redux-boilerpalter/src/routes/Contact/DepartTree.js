import React, { Component } from 'react';
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import Ztree from '../../components/Ztree';
import css from './assets/DepartTree.css';

class DepartTree extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFetchPerson = this.handleFetchPerson.bind(this);
  };
  componentWillReceiveProps(nextState) {
    this.setState({
      selectedKeys: nextState.contactPerson.departId.toString() //TODO
    });
  };
  handleClick(id) {
    this.handleFetchPerson(id);
  };
  handleFetchPerson(id) {
    this.props.fetchContactPerson({
      departId: id,
      searchType: '00',
      keyWord: '',
      pageIndex: 1,
      pageSize: this.props.contactPerson.pageSize
    });
  };
  render() {
    const { selectedKeys } = this.state;
    return (
      <div className={css.menu}>
        <div className={css.top}>
          <a className={css.tl}>组织架构</a>
          <Link className={css.tr} to="/contact/edit">编辑部门</Link>
        </div>
        <div className={css.ztree}>
          <Scrollbars>
            <Ztree
              setting={{url: '/api/departemt'}}
              defaultEvent={(array) => this.handleClick(array[0])}
              selectedKeys={[selectedKeys]}
              onClick={this.handleClick}
              ref='tree'
            />
          </Scrollbars>
        </div>
        <div className={css.bottom}>
          <a
            className={`${css.bf}${this.state.selectedKeys === '-1' ? ' '+ css.cur : ''}`}
            onClick={()=>this.handleClick('-1')}
          >
            未分配部门的人员
          </a>
          <a
            className={`${css.bf}${this.state.selectedKeys === '-2' ? ' '+ css.cur : ''}`}
            onClick={()=>this.handleClick('-2')}
          >
            离职人员
          </a>
        </div>
      </div>
    );
  };
};

export default DepartTree;
