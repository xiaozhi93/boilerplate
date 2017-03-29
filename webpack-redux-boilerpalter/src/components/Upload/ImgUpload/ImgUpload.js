/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import Upload from 'react-fileupload';

import style from './ImgUpload.css';

class ImgUpload extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            isUplaoding: false,
            progress: 0,
            isMask: false,
            isSuccess: false,
            tipsText: '',
        };
        this.delete = this.delete.bind(this);
    }

    static PropTypes = {
        action: React.PropTypes.string.isRequired,
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
        tips: '建议上传图片尺寸640×320',
        action: '',
        paramAddToField: {},
        param: {},
        files: [],
        fileFieldName: 'uplaod',
        maxFileSize: 2,
        types: ['jpg','png','gif','bmp','jpeg'],
        defaultImg: 'https://img.51vj.cn/announcement/headImage/img_shangc.png',
    }

    delete(){
        this.refs.chooseAndUpload.src = this.props.defaultImg;
        this.setState({
            isSuccess: false,
        })
    }

    checkFileType(files){
        if(files.length && typeof files === 'object'){
            for (let item of files){
                let {size, name} = item;
                if(!this.props.types.includes(name.split('.').pop().toLowerCase())){
                    console.log(`不支持的文件类型，请上传${this.props.types}类型的文件.`);
                    return false;
                }
                if(size > (this.props.maxFileSize * 1024 * 1024)){
                    console.log(`文件超出大小，最大允许${this.props.maxFileSize}M.`);
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    uploadSuccess(data){
        this.setState({
            isMask: false,
            isUplaoding: false,
            isSuccess: true
        });
        this.refs.chooseAndUpload.src = data.data.url;
    }

    uploadError(err){
        console.log(err);
        this.setState({
            tipsText: '上传失败',
            isUplaoding: false,
        });
        setTimeout(()=>{
            this.setState({
                isMask: false,
            });
        }, 2000);
    }

    render () {
        const cs = classnames.bind(style);
        const options = {
            baseUrl: this.props.action,
            chooseAndUpload: true,
            paramAddToField: this.props.paramAddToField,
            param: this.props.param,
            fileFieldName: this.props.fileFieldName,
            accept: 'image/*',
            beforeChoose: ()=>{
                if(this.state.isUplaoding){
                    console.log('尚有未完成的上传操作');
                    return false;
                }
            },
            chooseFile: (files) => {
                console.log('chooseFile:', files);
            },
            beforeUpload: (files) => {
                this.setState({
                    isMask: true,
                    tipsText: '正在上传...'
                });
                return this.checkFileType(files);
            },
            uploading: (progress) => {
                this.setState({
                    progress: ((progress.loaded / progress.total) * 100).toFixed(1),
                    isUplaoding: true
                });
            },
            uploadSuccess: (data) => {
                this.uploadSuccess(data);
            },
            uploadError: (err) => {
                this.uploadError(err);
            },
            uploadFail: (err) => {
                this.uploadError(err);
            }
        };
        return (
            <div className={style.wrap}>
                <div className={style.preview}>
                    <div className={style.imgUploadBtnWrap}>
                        <Upload options={options}>
                            <img ref="chooseAndUpload" src={this.props.defaultImg} title="点击选择图片上传"/>
                        </Upload>
                    </div>
                    <span className={style.tips}>{this.props.tips}</span>
                    <div className={cs('masking', {'active': this.state.isMask})}>
                        <p>{this.state.tipsText}&nbsp;&nbsp;{this.state.progress}%</p>
                    </div>
                    <a className={cs('del', {'active': this.state.isSuccess})} onClick={this.delete} title="删除"><i className="iconfont icon-del2"></i></a>
                </div>
            </div>
        );
    }
}

export default ImgUpload;
