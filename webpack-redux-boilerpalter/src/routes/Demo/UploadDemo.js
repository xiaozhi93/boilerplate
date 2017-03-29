/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import { ImgUpload, MutImgUpload, FileUpload, VideoUpload } from '../../components/Upload';
class UploadDemo extends React.Component {

    constructor (props){
        super(props);
        this.state = {

        };
    }

    render () {
        const imgs = [
            {
                id: 201,
                url: 'https://img.51vj.cn/ghImg/2015/10/15/1444911038994.jpg',
                isDefault: true
            },
            {
                id: 202,
                url: 'https://img.51vj.cn/guanhuai/2014/11/05/1415150925618.jpg',
                isDefault: true
            },
            {
                id: 203,
                url: 'https://img.51vj.cn/ghImg/2015/10/23/1445584714911.jpg',
                isDefault: false
            },
        ];

        const files = [
            {
                id: 201,
                fileIconUrl: 'http://61.130.181.115:8181/wap/kFiles/html/wjstore/PC/images/doc.png',
                name: '我是有趣的文件名，我很傲娇',
            }
        ];

        return (
            <div style={{padding: '50px'}}>
                <p style={{fontSize:'16px', color:"#666", marginTop:'20px'}}>1. 图片上传1</p>

                <ImgUpload action="http://localhost:3000/upload"></ImgUpload>

                <p style={{fontSize:'16px', color:"#666", marginTop:'20px'}}>2. 图片上传2</p>

                <MutImgUpload imgs={imgs} amount={9} action="http://localhost:3000/upload"></MutImgUpload>

                <p style={{fontSize:'16px', color:"#666", marginTop:'20px'}}>3. 图片上传3</p>

                <MutImgUpload preview imgs={imgs} amount={9} action="http://localhost:3000/upload"></MutImgUpload>

                <p style={{fontSize:'16px', color:"#666", marginTop:'20px'}}>4. 文件上传</p>

                <FileUpload files={files} action="http://localhost:3000/upload"></FileUpload>

                <p style={{fontSize:'16px', color:"#666", marginTop:'20px'}}>5. 视频上传</p>

                <VideoUpload files={files} action="http://localhost:3000/upload"></VideoUpload>
            </div>
        );
    }
}

export default UploadDemo;
