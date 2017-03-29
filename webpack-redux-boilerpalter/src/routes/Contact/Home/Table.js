import React, { Component } from 'react';
import css from './assets/Table.css';

class TBody extends Component{
  render(){
    const item = this.props.data.node,
      sort = this.props.data.sort,
      tbody = this.props.data.tbody,
      isAllCheckedFn = () => {
        const checkboxList = tbody.querySelectorAll('input[type=checkbox]')
        let isAllChecked = true;
        for (let i = 0, length = checkboxList.length; i < length; i++) {
          if(!checkboxList[i].checked) {
            isAllChecked = false
            break
          }
        }
        this.props.data.cfn(isAllChecked)
      }
    return(
      <tr>
        <td>
          <input type="checkbox" data-id={item.id} onClick={isAllCheckedFn}/>
        </td>
        <td className={css.name}>
          <img className={css.headimg} src={item.logo || item.headImage} alt="头像" />
          {item.name}
        </td>
        {sort.length > 0 && sort.map((node, i)=>
          <td key={i}>{item[node]}</td>
        )}
        <td>{item.isShow ? '是' : '否'}</td>
        <td className={css.aaa}>
          <a>
            <span className="iconfont">&#xe634;</span>
          </a>
          <a>
            <span className="iconfont">&#xe61a;</span>
          </a>
          <a>
            <span className="iconfont">&#xe654;</span>
          </a>
        </td>
        <td></td>
      </tr>
    )
  }
}

class Table extends Component{
  render(){
    const { contactPerson } = this.props;
    const body = (
      contactPerson.isFetching
      ? <div>
          加载中……
        </div>
      : contactPerson.success
      ? <table className="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" ref="checkbox"/>
              </th>
              <th className={css.name} style={{paddingLeft:'55px'}}>姓名</th>
              {contactPerson.headList.length > 0 && contactPerson.headList.map((node, i) =>
                <th key={i}>{node}</th>
              )}
              <th>隐藏</th>
              <th>操作</th>
              <th>
                <a className={css.btn}></a>
              </th>
            </tr>
          </thead>
          <tbody ref="tbody">
            {contactPerson.list.length > 0 && contactPerson.list.map((node, i) =>
              <TBody key={i} data={{node:node,sort:contactPerson.keyList,tbody:this.refs.tbody}} />
            )}
          </tbody>
        </table>
      : <div>
          加载失败
        </div>
    );
    return (
      <div>
        {body}
      </div>
    );
  };
};

export default Table;
