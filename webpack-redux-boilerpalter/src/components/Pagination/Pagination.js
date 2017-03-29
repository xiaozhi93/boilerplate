/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import style from './css/pagination.css';
import Select from '../../components/Select';

class Pagination extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            cur: 1,
            default: 1,
            total: 101,
            pageSize: 10,
            size: 5,
            defaultPageSize: 10,
        };
        this.prePage = this.prePage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.goPage = this.goPage.bind(this);
        this.pageSizeChange = this.pageSizeChange.bind(this);
        this.inputPage = this.inputPage.bind(this);
    }



    componentWillReceiveProps(nextProps){
        //this.setState(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentWillUnmount(){

    }

    goPage(event){
        let page = event.target.dataset.page;
        if(page){
            this.setState({
                cur: page | 0,
            });
        }
    }

    inputPage(){
        const page = this.refs.inputPage.value;
        if(page.trim() === '' ||　typeof page !== 'number'){
            console.log('请输入正确的跳转的页码');
        } else {

        }
    }

    pageSizeChange(event){
        console.log(event.target.value);
        this.setState({
            pageSize: event.target.value | 0,
        });
    }

    prePage(){
        let page = this.state.cur;
        if(page !== 1){
            page--;
        }
        this.setState({
            cur: page,
        });
    }

    nextPage(){
        let { cur, total, pageSize, size } = this.state;
        let totalPages = Math.ceil(total / pageSize);
        if(cur !== totalPages){
            cur++;
        }
        this.setState({
            cur: cur,
        });
    }

    render () {

        const cs = classnames.bind(style);
        const { cur, total, pageSize, size } = this.state;
        const clip = () => { let key = Math.random(); return (<li key={key} className={style.clip}>···</li>);};
        let totalPages = Math.ceil(total / pageSize);
        const pages = (cur, total, pageSize, size) => {
            let items = [];
            if(cur < size){
                // let page = cur - 1;
                let end = totalPages > size ? size : totalPages;
                for(let i = 0; i < end; i++){
                    // page++;
                    items.push(<li key={i} className={cs({cur: i + 1 === cur})} data-page={i + 1}>{i + 1}</li>);
                }
                totalPages > size && items.push(clip());
            } else {
                let page = totalPages - cur > 2 ? cur - 3 : totalPages - 6;
                // let page =  cur - 3;
                let end = 5;
                items.push(<li key={Math.random()} data-page={1}>1</li>);
                items.push(clip());
                for(let i = 0; i < end; i++){
                    page++;
                    if(page >= totalPages){
                        break;
                    }
                    items.push(<li key={i} className={cs({cur: page === cur})} data-page={page}>{page}</li>);
                }
                page < totalPages - 1 && items.push(clip());
                // items.push(<li key={Math.random()} data-page={totalPages}>{totalPages}</li>);
            }
            return items;
        };

        return (
            <div className={style.wrap}>
                <div className={style.pageInfo}>
                    <p>共<span>{totalPages}</span>页，到第<input ref="inputPage" type="text"/>页</p>
                    <a className={style.goPage} onClick={this.inputPage}>确定</a>
                </div>
                <div className={style.page} onClick={this.goPage}>
                    <ul className="clearfix">
                        <li className={cs({'disable': cur === 1})} onClick={this.prePage}>&lt;上一页</li>
                        {/* <li className={style.cur}>1</li> */}
                        {pages(cur, total, pageSize, size)}
                        {/* <li className={style.clip}>···</li> */}
                        <li className={cs({'cur': cur === totalPages})} data-page={totalPages}>{totalPages}</li>
                        <li className={cs({'disable': cur === totalPages})} onClick={this.nextPage}>下一页&gt;</li>
                    </ul>
                </div>
                <div className={style.pageSize}>
                    <label>一页显示</label>
                    <select onChange={this.pageSizeChange}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <label>页</label>
                </div>
            </div>
        );
    }
}

Pagination.defaultProps = {

};

Pagination.propTypes = {
    total: React.PropTypes.number.isRequired,
    cur: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    defaultPageSize: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired
};

export default Pagination;
