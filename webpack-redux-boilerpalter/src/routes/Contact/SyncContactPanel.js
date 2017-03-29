/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import TitleBar from './TitleBar';
import {Alert} from '../../components/Modal';
import style from './assets/SyncContactPanel.css';

class SyncContactPanel extends React.Component {

    static defaultProps = {
        fetchUrl: 'http://localhost:8981'
    }

    constructor (props){
        super(props);
        this.state = {
            sync: false,
            syncText: '正在努力同步数据，请稍后',
            syncProgress: '已完成26%'
        };
        this.sync = this.sync.bind(this);
    }


    sync(){
        fetch( this.props.fetchUrl + '/sync', {
            method: 'get'
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            this.setState({
                syncProgress: `已完成 ${data.progress}%`
            })
        })
        this.setState({
            sync: true
        });
    }

    render () {
        return (
            <div className={style.syncWrap}>
                <Alert visible={this.state.sync} onClose={()=>this.setState({sync: false})}>
                    <p>{this.state.syncText}</p>
                    <p>{this.state.syncProgress}</p>
                </Alert>
                <TitleBar title={'同步成员'}/>
                <div className={style.sync}>
                    <h1 className={style.title}>同步微信通讯录</h1>
                    <p>同步功能将会从微信企业号后台同步通讯录中不存在的用户，请注意：</p>
                    <p>1、 企业号通讯录中未分配部门的成员将会同步到“未分配部门的人员”中去；</p>
                    <p>2、 为了避免双向操作带来的数据不一致问题和保证通讯录的实时性，通讯录的维护请只在此管理后台操作；</p>
                    <p className={style.start}>
                        <a className={`${'btn btn-primary btn-lg'}`} onClick={this.sync}>开始同步</a>
                    </p>
                </div>
                <h1 className={style.subTitle}>上一次同步状态</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>操作时间</th>
                            <th>操作者</th>
                            <th>状态</th>
                            <th>比例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2017</td>
                            <td>小梦</td>
                            <td>ok</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SyncContactPanel;
