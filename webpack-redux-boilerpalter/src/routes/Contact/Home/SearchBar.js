import React, { Component } from 'react';
import Select from '../../../components/Select';
import css from './assets/SearchBar.css';

class SearchBar extends Component{
  constructor(props) {
    super(props);
    const { searchType, keyWord } = this.props.contactPerson;
    this.state = {
      searchType: searchType,
      keyWord: keyWord
    };
    this.searchAction = this.searchAction.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  };
  componentWillReceiveProps(nextState) {
    const { searchType, keyWord } = nextState.contactPerson;
    this.setState({
      searchType: searchType,
      keyWord: keyWord
    });
  };
  searchAction() {
    this.props.fetchContactPerson({
      departId: '',
      searchType: this.refs.select.value,
      keyWord: this.state.keyWord,
      pageIndex: 1,
      pageSize: this.props.contactPerson.pageSize
    });
  };
  handleKeyDown(e) {
    if (e.keyCode !== 13) return;
    this.searchAction();
  };
  render() {
    const { departemtIdName, totleCount } = this.props.contactPerson;
    const { searchType, keyWord } = this.state;
    return (
      <div className={css.bar}>
        <p className={css.count}>{departemtIdName}（共{totleCount}人）</p>
        <div className={css.search}>
          <Select
            value={searchType}
            onChange={()=>this.searchAction()}
            ref="select"
          >
            <option value="00">全部成员</option>
            <option value="01">已关注</option>
            <option value="02">未关注</option>
          </Select>
          <input
            className={css.input}
            type="text"
            placeholder="搜索名字/拼音/手机号码/职位"
            onKeyDown={this.handleKeyDown}
            onChange={(e)=>this.setState({keyWord: e.target.value})}
            value={keyWord}
            ref="input"
          />
          <a
            className="btn btn-success"
            onClick={this.searchAction}
          >
            搜索
          </a>
        </div>
      </div>
    );
  };
};

export default SearchBar;
