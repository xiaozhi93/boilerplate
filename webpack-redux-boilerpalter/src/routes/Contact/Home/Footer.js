import React, { Component } from 'react';
import { fetchContactPersonList } from '../../../actions';
import Select from '../../../components/Select';
import css from './assets/Footer.css';

class Footer extends Component{
  constructor(props) {
    super(props);
    this.pageSizeChange = this.pageSizeChange.bind(this);
    this.pageIndexChage = this.pageIndexChage.bind(this);
  };
  pageSizeChange(pageSize) {
    //const { departId, keyWord, searchType } = this.props.contactPerson;
    this.props.fetchContactPerson({
      ...this.props.contactPerson,
      pageSize: pageSize,
      pageIndex: 1,
      /*departId: departId,
      keyWord: keyWord,
      searchType: searchType*/
    });
  };
  pageIndexChage(pageIndex) {
    //const { departId, keyWord, searchType, pageSize } = this.props.contactPerson;
    this.props.fetchContactPerson({
      ...this.props.contactPerson,
      pageIndex: pageIndex,
      /*pageSize: pageSize,
      departId: departId,
      keyWord: keyWord,
      searchType: searchType*/
    });
  };
  render() {
    const { totleCount, pageIndex, pageSize } = this.props.contactPerson;
    const size = Math.ceil(totleCount / pageSize);
    let items = [];
    for (var i = 0; i < size; i++) {
      items.push(i);
    };
    const pageShow =
      totleCount <= pageSize
      ? ''
      : (<div style={{display:'inline-block',marginLeft:'10px'}}>
          前往
          <Select
            value={pageIndex}
            onChange={()=>this.pageIndexChage(this.refs.select1.value)}
            ref="select1"
          >
            {items.map((item, i)=>{
              const k = i += 1;
              return <option key={i} value={k}>{k}</option>
            })}
          </Select>
          页
          </div>
        )
    return (
      <div className={css.footer}>
        显示行数
        <Select
          value={pageSize}
          onChange={()=>this.pageSizeChange(this.refs.select.value)}
          ref="select"
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Select>
        共{totleCount}条
        {pageShow}
      </div>
    );
  };
};

export default Footer;
