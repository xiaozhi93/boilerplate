/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import Modal from './Modal';

import style from './modal.css';

class Confrim extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            visible: false
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    render () {
        return (
            <Modal
                title={this.props.title || '提示'}
                btn={this.props.btn || ['确定','取消']}
                onOk={this.props.onOk || function(){}}
                visible={this.state.visible}
                onClose={this.props.onClose}
                width={this.props.width || 350}
                height={this.props.height || 180}
                isMaskClose={this.props.isMaskClose === undefined ? true : this.props.isMaskClose}
                >
                <div className={style.confrimBody}>
                    {this.props.children}
                </div>
            </Modal>
        );
    }
}

function confrim(){
    console.log('confrim');
}

export default Confrim;
