import React, { Component } from 'react';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import Datepicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/assets/index.css';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class MonthPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.defaultValue
        };
        this.onChange=this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({
            value,
        });
    }

    render() {
        const props = this.props;
        const calendar = (<MonthCalendar
            defaultValue={props.defaultValue}
            locale={zhCN}
            format={"YYYY-MM"}
            disabledDate={props.disabledDate}
            monthCellRender={props.monthCellRender}
            monthCellContentRender={props.monthCellContentRender}
        />);
        return (<Datepicker
                    {...props}
                    calendar={calendar}
                    value={this.state.value}
                    onChange={this.onChange}
                    disabled={props.disabled}
                >
                    {
                        ({ value }) => {
                            return (<input
                                placeholder={props.placeholder || "请选择月份"}
                                readOnly
                                className={props.className}
                                style={props.style}
                                value={value && value.format("YYYY-MM") || ''}
                                disabled={props.disabled}
                            />);
                        }
                    }
                </Datepicker>);
    }
}

MonthPicker.propTypes = {
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
};

export default MonthPicker;