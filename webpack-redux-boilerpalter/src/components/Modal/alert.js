/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import Modal from './Modal';

import style from './modal.css';

class Alert extends React.Component {

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
                title={this.props.title}
                btn={this.props.btn || ['确定']}
                onOk={this.props.onOk || function(){}}
                visible={this.state.visible}
                onClose={this.props.onClose}
                width={this.props.width || 300}
                height={this.props.height || 180}
                isMaskClose={this.props.isMaskClose === undefined ? true : this.props.isMaskClose}
                >
                <div className={style.alertBody}>
                    {this.props.children}
                </div>
            </Modal>
        );
    }
}

export default Alert;
