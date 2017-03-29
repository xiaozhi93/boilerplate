/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import Upload from 'react-fileupload';

import style from './VideoUpload.css';

class VideoUpload extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            curCount: 0,
            progress: 0,
            tipsText: '',
            isProgressBar: false,
            imgs: this.props.imgs,
        };
        this.delete = this.delete.bind(this);
    }

    static PropTypes ={
        amount: React.PropTypes.number,
        action: React.PropTypes.string,
        paramAddToField: React.PropTypes.object,
        param: React.PropTypes.array,
        imgs: React.PropTypes.array,
    }

    static defaultProps = {
        amount: 9,
        action: '',
        paramAddToField: {},
        param: {},
        imgs: [],
        title: '上传视频',
        tips: '仅支持.rmvb.rm.mov.mp4类型文件',
        fileFieldName: 'uplaod',
        maxFileSize: 200,
        types: ['rm','rmvb','mov','mp4'],
    }

    componentDidMount(){
        this.setState({
            curCount: this.props.imgs.length
        });
    }

    delete(event){
        console.log(event.target.dataset.id);
        let curImgs = this.state.imgs;
        let curCount = this.state.curCount;
        curImgs.splice(parseInt(event.target.dataset.id), 1);
        curCount--;
        this.setState({
            curCount,
            imgs: curImgs,
        });
    }

    checkFileType(files){
        if(files.length && typeof files === 'object'){
            for (let item of files){
                let {size, name} = item;
                if(this.state.curCount === this.props.amount){
                    console.log(`最多支持${this.props.amount}个视频，请检查.`);
                    return false;
                }
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
            return true;
        }
    }

    uploadSuccess(data){
        console.log(data);
        let imgs = this.state.imgs;
        if(data.code === 1){
            let item = data.data;
            imgs.push(item);
            let state = {
                curCount: imgs.length,
                isProgressBar: false,
                imgs,
            }
            this.setState(state);
        }
    }

    uploadError(err){
        console.log(err);
        this.setState({
            tipsText: '上传失败'
        });
    }

    render () {
        const cs = classnames.bind(style);
        const options = {
            baseUrl: this.props.action,
            chooseAndUpload: true,
            paramAddToField: this.props.paramAddToField,
            accept: 'video/*',
            param: this.props.param,
            chooseFile: (files) => {
                console.log('chooseFile:', files);
                const fileName = typeof files === 'string' ? files : files[0].name;
            },
            beforeUpload: (files) => {
                this.setState({
                    isProgressBar: true,
                    tipsText: '正在上传...',
                });
                return this.checkFileType(files);
            },
            uploading: (progress) => {
                this.setState({
                    progress: ((progress.loaded / progress.total) * 100).toFixed(1),
                });
            },
            uploadSuccess: (data) => {
                this.uploadSuccess(data);
            },
            uploadError: (err) => {
                this.uplaodError(err);
            },
            uploadFail: (err) => {
                this.uplaodError(err);
            }
        };
        return (
            <div className={style.wrap}>
                <div className={style.imgWrap}>
                    <ul>
                        {
                            this.state.imgs.map((item, index)=>(
                                <li key={index}>
                                    <img src={item.url} alt=""/>
                                    {item.isDefault ? '' : (<span className={style.del}><i data-id={index} onClick={this.delete} className="iconfont icon-close" title="删除"></i></span>)}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={cs('uploadWrap', {'active': this.state.curCount === this.props.amount ? false : true})}>
                    <Upload options={options}>
                        <div ref="chooseAndUpload" className={style.add} title="点击选择视频"></div>
                    </Upload>
                </div>
                <div className={cs('progressBar', {'active': this.state.isProgressBar})}>
                    <p className={style.progressTips}>{this.state.tipsText}{this.state.progress}%</p>
                    <div className={style.progress}>
                        <div style={{width: `${this.state.progress}%`}} className={style.pointer}></div>
                    </div>
                </div>
                <p className={style.tips}>*最多可上传{this.props.amount}个视频</p>
            </div>
        );
    }
}

export default VideoUpload;
