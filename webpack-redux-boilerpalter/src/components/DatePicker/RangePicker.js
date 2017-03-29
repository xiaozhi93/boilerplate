import React, { Component, PropTypes } from 'react';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import Datepicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import 'moment/locale/zh-cn';

const now = moment();
const Picker = React.createClass({
    render() {
        const props = this.props;
        const { showValue } = props;
        const calendar = (
            <RangeCalendar
                type={props.type}
                locale={zhCN}
                format={props.format || "YYYY-MM-DD"}
                defaultValue={now}
                onChange={props.onChange}
                disabledDate={props.disabledDate}
                showWeekNumber={props.showWeekNumber === undefined ? false : props.showWeekNumber}
                showToday={props.showToday === undefined ? true : props.showToday}
                showOk={props.showOk}
                showClear={props.showClear === undefined ? false : props.showClear}
                dateInputPlaceholder={props.dateInputPlaceholder}
            />);
        return (
            <Datepicker
                open={props.open}
                onOpenChange={props.onOpenChange}
                calendar={calendar}
                value={props.value}
                disabled={props.disabled}
            >
                {
                    () => {
                        return (
                            <span>
                                <input
                                    placeholder={"请选择"+ (props.type=="start" ? "开始" : "结束") +"日期"}
                                    readOnly
                                    value={showValue && showValue.format("YYYY-MM-DD") || ''}
                                    className={props.className+" "+props.className+ (props.type=="start" ? "Start" : "End")}
                                    disabled={props.disabled}
                                />
                            </span>
                        );
                    }
                }
            </Datepicker>);
    },
});

class RangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            startOpen: false,
            endOpen: false,
        };
        this.onStartOpenChange=this.onStartOpenChange.bind(this);
        this.onEndOpenChange=this.onEndOpenChange.bind(this);
        this.onStartChange=this.onStartChange.bind(this);
        this.onEndChange=this.onEndChange.bind(this);
        this.disabledStartDate=this.disabledStartDate.bind(this);
    }
    onStartOpenChange(startOpen) {
        this.setState({
            startOpen,
        });
    }

    onEndOpenChange(endOpen) {
        this.setState({
            endOpen,
        });
    }

    onStartChange(value) {
        this.setState({
            startValue: value[0],
            startOpen: false,
            endOpen: true,
        });
    }

    onEndChange(value) {
        this.setState({
            endValue: value[1],
        });
    }

    disabledStartDate(endValue) {
        if (!endValue) {
            return false;
        }
        const startValue = this.state.startValue;
        if (!startValue) {
            return false;
        }
        return endValue.diff(startValue, 'days') < 0;
    }

    render() {
        const state = this.state;
        return (
            <span>
                <Picker
                    {...this.props}
                    onOpenChange={this.onStartOpenChange}
                    type="start"
                    showValue={state.startValue}
                    open={this.state.startOpen}
                    value={[state.startValue, state.endValue]}
                    onChange={this.onStartChange}
                />
                &nbsp;到&nbsp;
                <Picker
                    {...this.props}
                    onOpenChange={this.onEndOpenChange}
                    open={this.state.endOpen}
                    type="end"
                    showValue={state.endValue}
                    disabledDate={this.disabledStartDate}
                    value={[state.startValue, state.endValue]}
                    onChange={this.onEndChange}
                />
            </span>);
    }
}

RangePicker.propTypes = {
    format: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
};

export default RangePicker;