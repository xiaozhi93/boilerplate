/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import style from './assets/TitleBar.css';
import { Link } from 'react-router';
class TitleBar  extends React.Component {

    constructor (props){
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <div className={style.bar}>
                <Link to="contact" className={`${'btn btn-default'} ${style.back}`}><i className="iconfont icon-back2"></i> 返回</Link>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default  TitleBar;
