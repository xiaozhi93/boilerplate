/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
//import $ from 'jquery';
import FileUpload from 'react-fileupload';

import TitleBar from './TitleBar';
import SetMemberAttrDialog from './SetMemberAttrDialog';
import Modal, {Confrim, Msg, Alert} from '../../components/Modal';
import Ztree from '../../components/Ztree';

import style from './assets/ImportAndExportPanel.css';

class ImportAndExportPanel extends React.Component {

    static defaultProps = {
        fetchUrl: 'http://localhost:8981'
    }

    constructor (props){
        super(props);
        this.state = {
            show: false,
            departTree: false,
            importState: false,
            msg: false,
            msgText: '',
            treeId: '',
            departs: '',
            uploadFileName: '请选择文件',
            importStateText: '',
            importStateProgress: 10
        };
    }

    componentDidMount(){

    }

    import(){

    }

    export(){
        const psw = this.refs.password.value;
        fetch(this.props.fetchUrl + '/export?password=' + psw,{
            method: 'get'
        }).then(data => {
            console.log(data);
        }).catch(data => {
            console.log(data);
        });
    }

    handleSelectDepartClick(){
        this.setState({
            departTree: true
        });
    }

    zTreeEvent(){
        return {
            onCheck: (event, treeId, treeNode) => {
                // console.log(treeNode);
            },
            onAsyncSuccess: (event, treeId) => {
                this.setState({
                    treeId: treeId
                });
            }
        };
    }

    getCheckedDeparts(){
        const treeId = this.state.treeId;
        const treeObj = $.fn.zTree.getZTreeObj(treeId);
        const nodes = treeObj.getCheckedNodes();
        let departs = [];
        for(let item of nodes){
            departs.push(item.name);
        }
        this.setState({
            departs: departs.join(',')
        });
    }

    render () {
        const classname = ClassNames.bind(style);
        let fileUploadOptions = {
            baseUrl: 'http://localhost:8981/upload',
            param: {
                appid: 1
            },
            chooseFile: (files) => {
                console.log('chooseFile:', files);
                const fileName = typeof files === 'string' ? files : files[0].name;
                this.setState({
                    uploadFileName: fileName
                });
            },
            beforeUpload: (files) => {
                console.log(files);
                if(!files){
                    this.setState({
                        msg: true,
                        msgText: '请选择文件'
                    });
                    return false;
                }
                this.setState({
                    importState: true,
                    importStateText: '正在上传...'
                });
            },
            uploading: (progress) => {
                console.log(progress.total, progress.loaded);
                this.setState({
                    importStateProgress: progress.loaded / progress.total
                });
            },
            uploadSuccess: (data) => {
                console.log(data);
                this.setState({
                    uploadFileName: '',
                    importStateText: '上传成功'
                });
            },
            uploadError: (err) => {
                console.log(err);
            },
            uploadFail: (err) => {
                console.log(err);
                this.setState({
                    importStateText: '上传失败'
                });
            }
        };
        return (
            <div className={style.main}>
                <Msg visible={this.state.msg} onClose={()=>this.setState({msg: false})}>{this.state.msgText}</Msg>
                <Modal
                    title="编辑显示内容"
                    visible={this.state.show}
                    btn={['确定','取消']}
                    onOk={()=>console.log('点击了确定')}
                    onClose={()=>this.setState({show: false})}
                    width={600}
                    height={500}
                    >
                    <SetMemberAttrDialog />
                </Modal>
                <Modal
                    title="选择部门"
                    visible={this.state.departTree}
                    onClose={()=>this.setState({departTree: false})}
                    onOk={this.getCheckedDeparts.bind(this)}
                    width={600}
                    height={600}
                    btn={['确定','取消']}
                    >
                    <div className={style.ztree} ref="ztree">
                      <Ztree setting={{url: 'http://localhost:8981/departemt'}} check={{enable: true}} events={this.zTreeEvent()} />
                    </div>
                </Modal>
                <Alert
                    visible={this.state.importState}
                    onClose={()=>this.setState({importState: false})}
                    >
                    <p className={style.importStateText}>{this.state.importStateText}</p>
                    <p className={style.importStateProgress}>{this.state.importStateProgress}%</p>
                </Alert>
                <TitleBar title={'批量导入/导出通讯录'}/>
                <h1 className={style.title}>导入通讯录</h1>
                <div className={style.import}>
                    <p className={style.des}>
                        您可以先
                        <a className={style.btn} onClick={()=>this.setState({show:true})}>设置通讯录成员属性</a>，再
                        <a className={style.btn}>下载《微加批量导入模板》</a>
                        请按照我们提供的标准模板填写通讯录的信息上传文件
                    </p>
                    <FileUpload options={fileUploadOptions}>
                        <a ref="chooseBtn" className={`${'btn btn-primary'} ${style.upload}`}>上传文件</a>
                        <span className={style.fileName}>{this.state.uploadFileName}</span>
                        <p className={style.tips}>温馨提示：批量导入后系统会为您自动同步1次，以保证与企业号通讯录数据一致。</p>
                        <p ref="uploadBtn" className={style.start}>
                            <a className={`${'btn btn-primary btn-lg'}`}>开始导入</a>
                        </p>
                    </FileUpload>
                </div>
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
                <h1 className={style.title}>导出通讯录</h1>
                <div className={style.export}>
                    <div className={style.inputWrap}>
                        <label>导出部门：</label>
                        <input value={this.state.departs} type="text" placeholder="/归属部门" onClick={this.handleSelectDepartClick.bind(this)}/>
                    </div>
                    <p className={style.warn}>为确保您公司的员工信息不被泄露，请设置导出文件的打开密码</p>
                    <div className={style.inputWrap}>
                        <label>输入密码：</label>
                        <input ref="password" type="password" placeholder="请输入密码"/>
                    </div>
                </div>
                <p className={style.start}>
                    <a className={`${'btn btn-primary btn-lg'}`} onClick={this.export.bind(this)}>确定</a>
                </p>
            </div>
        );
    }
}

export default ImportAndExportPanel;
