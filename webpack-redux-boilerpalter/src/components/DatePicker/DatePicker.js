import React, { Component, PropTypes } from 'react';
import Calendar from 'rc-calendar';
import Datepicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/assets/index.css';

import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const timePickerElement = <TimePickerPanel />;

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTime:this.props.showTimePicker,
            value:this.props.defaultValue
        };
        this.disabledDate=this.disabledDate.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({
            value,
        });
    }

    disabledDate(current) {
        if (!current) {
            return false;
        }
        let minDate=moment().subtract(500,"years");
        let maxDate=moment().add(500,"years");
        if(this.props.minDate){
            minDate=this.props.minDate;
            minDate.hour(0);
            minDate.minute(0);
            minDate.second(0);
        }
        if(this.props.maxDate){
            maxDate=this.props.maxDate;
            maxDate.hour(23);
            maxDate.minute(59);
            maxDate.second(59);
        }
        return current < minDate || current > maxDate;
    }
    render() {
        const state = this.state;
        const props = this.props;
        const format = props.format || "YYYY-MM-DD";
        const calendar = (<Calendar
            defaultValue={props.defaultValue}
            locale={zhCN}
            format={format}
            disabledDate={props.disabledDate || this.disabledDate}
            disabledTime={state.showTime ? props.disabledTime : function(){}}
            showDateInput={props.showDateInput === undefined ? true : props.showDateInput}
            showWeekNumber={props.showWeekNumber === undefined ? false : props.showWeekNumber}
            showToday={props.showToday === undefined ? true : props.showToday}
            showOk={props.showOk}
            dateInputPlaceholder={props.dateInputPlaceholder}
            timePicker={state.showTime ? timePickerElement : null}
        />);
        return (
            <Datepicker
                {...props}
                calendar={calendar}
                value={state.value}
                onChange={this.onChange}
                disabled={props.disabled}
            >
                {
                    ({ value }) => {
                        return (<input
                                placeholder={props.placeholder || "请选择日期"}
                                readOnly
                                className={props.className}
                                style={props.style}
                                value={value && value.format(format) || ''}
                                disabled={props.disabled}
                            />
                        );
                    }
                }
            </Datepicker>
        );
    }
}

DatePicker.propTypes = {
    showTimePicker: React.PropTypes.bool,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
};

export default DatePicker;