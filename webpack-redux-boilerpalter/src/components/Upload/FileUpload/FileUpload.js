/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import Upload from 'react-fileupload';

import style from './FileUpload.css';

class FileUpload extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            curCount: 0,
            isMask: false,
            files: this.props.files,
        };
        this.delete = this.delete.bind(this);
    }

    static PropTypes = {
        action: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number,
        title: React.PropTypes.string,
        tips: React.PropTypes.string,
        paramAddToField: React.PropTypes.object,
        param: React.PropTypes.array,
        files: React.PropTypes.array,
        fileFieldName: React.PropTypes.string,
        maxFileSize: React.PropTypes.number,
        types: React.PropTypes.arrary,
    }

    static defaultProps = {
        amount: 9,
        title: '上传附件',
        tips: '仅支持doc.docx.ppt.pptx.txt.xlsx.xls.pdf.类型文件',
        action: '',
        paramAddToField: {},
        param: {},
        files: [],
        fileFieldName: 'uplaod',
        maxFileSize: 20,
        types: ['doc','docx','ppt','pptx','txt','xls','xlsx','pdf'],
    }

    componentDidMount(){
        this.setState({
            curCount: this.props.files.length
        });
    }

    delete(event){
        console.log(event.target.dataset.id);
        let curFiles = this.state.files;
        let curCount = this.state.curCount;
        curFiles.splice(parseInt(event.target.dataset.id), 1);
        curCount--;
        this.setState({
            curCount,
            files: curFiles,
        });
    }

    checkFileType(files){
        if(files.length && typeof files === 'object'){
            for (let item of files){
                let {size, name} = item;
                if(this.state.curCount === this.props.amount){
                    console.log(`最多支持${this.props.amount}个附件，请检查.`);
                    this.closeMasking();
                    return false;
                }
                if(!this.props.types.includes(name.split('.').pop().toLowerCase())){
                    console.log(`不支持的文件类型，请上传${this.props.types}类型的文件.`);
                    this.closeMasking();
                    return false;
                }
                if(size > (this.props.maxFileSize * 1024 * 1024)){
                    console.log(`文件超出大小，最大允许${this.props.maxFileSize}M.`);
                    this.closeMasking();
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    uploadSuccess(data){
        console.log(data);
        let files = this.state.files;
        if(data.code === 1){
            let item = data.data;
            files.push(item);
            let state = {
                curCount: files.length,
                files,
            }
            this.setState(state);
        }
    }

    showMasking(){
        this.setState({
            isMask: true
        });
    }

    closeMasking(){
        this.setState({
            isMask: false
        });
    }

    render () {
        const cs = classnames.bind(style);
        const options = {
            baseUrl: this.props.action,
            chooseAndUpload: true,
            paramAddToField: this.props.paramAddToField,
            param: this.props.param,
            fileFieldName: this.props.fileFieldName,
            chooseFile: (files) => {

            },
            beforeUpload: (files) => {
                this.showMasking();
                return this.checkFileType(files);
            },
            uploading: (progress) => {

            },
            uploadSuccess: (data) => {
                this.closeMasking();
                this.uploadSuccess(data);
            },
            uploadError: (err) => {
                console.log(err);
                this.closeMasking();
            },
            uploadFail: (err) => {
                console.log(err);
                this.closeMasking();
            }
        };
        return (
            <div className={style.wrap}>
                <div className="clearfix">
                    <span className={style.title}>{this.props.title}</span>
                    <div className={style.uploadWrap}>
                        <Upload options={options}>
                            <span ref="chooseAndUpload" className={style.btn} title="点击选择文件"></span>
                        </Upload>
                    </div>
                    <span className={cs('loading', {'active': this.state.isMask})}><span title="正在上传..."><i className="iconfont icon-loading"></i></span></span>
                    <span className={style.tips}>{this.props.tips}</span>
                </div>
                <div className={style.list}>
                    <ul>
                        {
                            this.props.files.map((item, index) =>
                                (
                                    <li key={index}>
                                        <img src={item.fileIconUrl} alt=""/>
                                        {item.name}
                                        <i onClick={this.delete} data-id={index} className="del iconfont icon-shanchu" title="删除"></i>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default FileUpload;
