/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import Rodal from '../../lib/rodal/lib/rodal';
import style from './modal.css';
import '../../lib/rodal/lib/rodal.css';

class Modal extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            visible: this.props.visible,
            width: this.props.width,
            height: this.props.height,
            showMask: this.props.showMask,
            showCloseButton: this.props.showCloseButton,
            className: this.props.className,
            customStyles: this.props.customStyles,
            customMaskStyles: this.props.customMaskStyles,
            animation: this.props.animation,    //可取值，zoom，fade，flip，door，rotate，slideUp，slideDown，slideLeft，slideRight
            title: this.props.title,
            onClose: this.props.onClose,
            isMaskClose: this.props.isMaskClose
        };
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        this.setState(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState){
        // console.log('nextProps: ', nextProps, '\nnextState: ',nextState);
        return true;
    }

    componentWillUnmount(){
        // console.log('unmount');
    }

    close(){
        console.log('close.');
        this.setState({
            visible: false
        });
        this.state.onClose();
    }

    yes(){
        this.close();
        if(typeof this.props.onOk){
            this.props.onOk();
        }
    }

    render () {
        const footerHeight = this.props.btn ? 0 : 40;
        const height = this.props.height >= 200 ? (this.props.height - 105 + footerHeight + 'px') : 'auto';
        let footer, title;
        if(this.props.btn){
            if(this.props.btn.length == 1){
                footer = (
                    <div className={style.footer}>
                        <a onClick={this.yes.bind(this)} className="btn btn-primary">{this.props.btn[0]}</a>
                    </div>
                );
            } else {
                footer = (
                    <div className={style.footer}>
                        <a onClick={this.yes.bind(this)} className="btn btn-primary">{this.props.btn[0]}</a>
                        <a onClick={this.close.bind(this)} className="btn btn-default">{this.props.btn[1]}</a>
                    </div>
                );
            }
        }
        if(this.state.title !== ''){
            title = <div className={style.title}>{this.state.title}</div>;
        } else {
            title = '';
        }

        return (
            <Rodal
                visible={this.state.visible}
                width={this.state.width}
                height={this.state.height}
                showMask={this.state.showMask}
                showCloseButton={this.state.showCloseButton}
                animation={this.state.animation}
                onClose={this.close.bind(this)}
                customStyles={this.state.customStyles}
                customMaskStyles={this.state.customMaskStyles}
                isMaskClose={this.state.isMaskClose}
                >
                {title}
                <div className={style.body} style={{height: height}}>
                    {this.props.children}
                </div>
                {footer}
            </Rodal>
        );
    }
}

Modal.defaultProps = {
    visible: false,
    width: 500,
    height: 300,
    showMask: true,
    showCloseButton: true,
    className: '',
    customStyles: {},
    customMaskStyles: {},
    animation: 'zoom',
    title: '',
    onClose: function(){}
};

Modal.propTypes = {
    visible: React.PropTypes.bool.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    showMask: React.PropTypes.bool,
    showCloseButton: React.PropTypes.bool,
    className: React.PropTypes.string,
    customStyles: React.PropTypes.object,
    customMaskStyles: React.PropTypes.object,
    animation: React.PropTypes.string,
    title: React.PropTypes.string,
    onClose: React.PropTypes.func.isRequired
};

export default Modal;
