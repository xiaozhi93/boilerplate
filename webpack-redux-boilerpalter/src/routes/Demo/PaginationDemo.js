/*jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React, { PropTypes } from 'react';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import '../../lib/rc-pagination/assets/index.css';
import '../../lib/rc-select/assets/index.css';

class PaginationDemo extends React.Component {

    constructor (props){
        super(props);
        this.state = {

        };
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onShowSizeChange(current, pageSize) {
      console.log(current);
      console.log(pageSize);
    }

    onChange(current, pageSize) {
      console.log('onChange:current=', current);
      console.log('onChange:pageSize=', pageSize);
    }

    render () {

        return (
            <div style={{padding: '50px'}}>
                <p style={{fontSize:'16px', color:"#666", marginTop:'20px'}}>1. 分页</p>
                <Pagination
                    selectComponentClass={Select}
                    showQuickJumper
                    showSizeChanger
                    showTotal={(total, range) => `总计 ${total} 页，`}
                    defaultPageSize={20}
                    defaultCurrent={5}
                    onShowSizeChange={this.onShowSizeChange}
                    onChange={this.onChange}
                    total={450}
                  />
            </div>
        );
    }
}

export default PaginationDemo;
