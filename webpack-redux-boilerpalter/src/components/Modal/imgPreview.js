/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import Modal from './Modal';
import Rodal from '../../lib/rodal/lib/rodal';
import '../../lib/rodal/lib/rodal.css';

import style from './modal.css';

class ImgPreview extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            visible: this.props.visible,
            isLoad: false,
            width: 100,
            height:100,
        };
        this.onLoad = this.onLoad.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    onLoad(){
        console.log('load.');
        let width, height;
        const winW = document.body.clientWidth || document.documentElement.clientWidth,
              winH = document.body.clientHeight || document.documentElement.clientHeight,
              fileW = this.refs.img.width,
              fileH = this.refs.img.height;

        if(fileW > (winW * 0.9) || fileH > (winH * 0.9)){
            if(fileW > fileH){
                width = winW * 0.8;
                height = fileH * (winW * 0.8 / fileW);
            } else {
                width = fileW * (winH * 0.8 / fileH);
                height = winH * 0.8;
            }
        } else {
            width = fileW;
            height = fileH;
        }
        width = width | 0;
        height = height | 0;
        this.setState({
            width,
            height,
            isLoad: true,
        });
    }

    render () {
        return (
            <Rodal
                visible={this.state.visible}
                width={this.state.width}
                height={this.state.height}
                showMask
                showCloseButton={false}
                onClose={this.props.onClose}
                customStyles={{backgroundColor:'rgba(0,0,0,0)',padding:'0','boxShadow':'none',color:'#fff',textAlign:'center'}}
                customMaskStyles={{backgroundColor:'rgba(40,40,40,.75)'}}
                isMaskClose
                animation={'slideUp'}
                >
                <div className={style.imgPreview} style={{width: this.state.width, height: this.state.height}}>
                    <div className={style.imgPreviewClose} onClick={()=>this.setState({visible: false})}><i className="iconfont icon-close"></i></div>
                    {
                        this.state.isLoad ? <img width={this.state.width} height={this.state.height} src={this.props.url} /> : <div className={style.loading}><i></i></div>
                    }
                </div>
                <img ref="img" onLoad={this.onLoad} src={this.props.url} style={{display: 'none'}} />
            </Rodal>
        );
    }
}

ImgPreview.defaultProps = {
    visible: false,
    type: 1
};

export default ImgPreview;
