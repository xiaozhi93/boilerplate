import React, { Component } from 'react';
import Timepicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

class TimePicker extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const props = this.props;
        return (<Timepicker
            {...props}
            clearText={"清除"}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder || "请选择时间"}
            showHour={props.showHour}
            showMinute={props.showMinute}
            showSecond={props.showSecond}
            format={props.format || "HH:mm:ss"}
            disabledHours={props.disabledHours}
            disabledMinutes={props.disabledMinutes}
            disabledSeconds={props.disabledSeconds}
            use12Hours={props.use12Hours}
            hideDisabledOptions={props.hideDisabledOptions}
            onChange={props.onChange}
            name={props.name}
            onOpen={props.onOpen}
            onClose={props.onClose}
        />);
    }
}

export default TimePicker;