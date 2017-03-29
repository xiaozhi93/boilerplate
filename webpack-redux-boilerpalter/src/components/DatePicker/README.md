# DatePicker
***
该组件是对[rc-calendar](https://github.com/react-component/calendar)和[rc-time-picker](https://github.com/react-component/time-picker)的简单封装.
## Usage

``` javascript
import { DatePicker, RangePicker, MonthPicker, TimePicker} from './DatePicker';
```
>默认导出为DatePicker

### DatePicker

``` javascript
import DatePicker from './DatePicker';
import moment from 'moment';

...

render() {
    return (
        <div>
            选择日期：
            <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                defaultValue={moment("2017-06-12 12:31:45")}
                showTimePicker={true}
                minDate={moment("2017-06-12 10:10:10")}
                maxDate={moment("2017-06-20 12:12:12")}
                className="calendarPickerInput"
             />
        </div>
    );
}
```

### RangePicker

``` javascript
import { RangePicker } from './DatePicker';

...
    <div>
        选择范围：
        <RangePicker
            className="calendarPickerInput"
        />
    </div>
```

### MonthPicker

``` javascript
import { MonthPicker } from './DatePicker';
import moment from 'moment';

...
    <div>
        选择月份：
        <MonthPicker
            className="calendarPickerInput"
            defaultValue={moment("2017-06")}
        />
    </div>
```

### TimePicker

``` javascript
import { TimePicker } from './DatePicker';
import moment from 'moment';

...
    <div>
        选择时间：
        <TimePicker
            format="HH:mm:ss"
            name="time"
            defaultValue={moment()}
        />
    </div>
```

***

## Props

### DatePicker

Property|Type|Default|Description
---|---|---|---
defaultValue|moment|/|默认值
format|string|YYYY-MM-DD|日期显示格式
disabledDate|func|默认为封装了最大最小值的函数|禁用日期的函数
disabledTime|func|/|禁用时间的函数
showTimePicker|bool|false|是否显示选择时间
showDateInput|bool|true|是否显示日历上方的input
showWeekNumber|bool|false|是否显示周数
showToday|bool|true|是否显示今天按钮
showOk|bool|auto|是否显示确认按钮
dateInputPlaceholder|string|/|日历中input的placeholder
maxDate|moment|/|最大值，在默认disabledDate时，生效
minDate|moment|/|最小值，在默认disabledDate时，生效
disabled|bool|false|是否禁用日期选择
placeholder|string|请选择日期|input的placeholder
className|string|/|input的className
style|object|/|input的style













