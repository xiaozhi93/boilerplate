/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import Modal from './Modal';

import style from './modal.css';

class Msg extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    componentDidUpdate(){
        if(this.state.visible){
            setTimeout(()=>{
                this.setState({visible: false});
                this.props.onClose();
            }, this.props.time * 1000);
        }
    }

    render () {
        return (
            <Modal
                visible={this.state.visible}
                width={this.props.width || 230}
                height={this.props.height || 50}
                showMask={true}
                showCloseButton={false}
                onClose={this.props.onClose}
                customStyles={{backgroundColor:'rgba(0,0,0,.6)',color:'#fff',fontSize:'14px',textAlign:'center'}}
                customMaskStyles={{display:'none'}}
                >
                <div className={style.msgBody}>
                    {this.props.children}
                </div>
            </Modal>
        );
    }
}

Msg.defaultProps = {
    visible: false,
    time: 2
};

export default Msg;
