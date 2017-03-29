/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import Modal from './Modal';

import style from './modal.css';

class Loading extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            visible: this.props.visible,
            time: this.props.time
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    render () {
        return (
            <Modal
                visible={this.state.visible}
                width={300}
                height={100}
                showMask={true}
                showCloseButton={false}
                onClose={this.props.onClose}
                customStyles={{backgroundColor:'rgba(0,0,0,0)',boxShadow:'none',color:'#fff',fontSize:'14px',textAlign:'center'}}
                customMaskStyles={{backgroundColor:'rgba(40,40,40,.75)'}}
                isMaskClose={false}
                >
                <div className={style.msgBody}>
                    <div className={style.loading}>
                        <i></i>
                        <p className={style.loadingText}>{this.props.text || '正在加载...'}</p>
                    </div>
                </div>
            </Modal>
        );
    }
}

Loading.defaultProps = {
    visible: false,
    type: 1
};

Loading.log = function(){
    console.log('i am log func.');
    let msg = document.createElement("div");
    document.body.appendChild(msg);
    ReactDom.render(<div>hello world</div>, msg);
};


export default Loading;
