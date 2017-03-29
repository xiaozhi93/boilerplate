# Modal
***
该组件是对[Rodal](https://github.com/chenjiahan/rodal)的简单封装，可点击[查看详情](https://github.com/chenjiahan/rodal).
## Usage

### modal

``` javascript
import {Modal, Confrim, Msg, Alert} from '../../components/Modal';
```
>默认导出为Modal

``` javascript
class ImportAndExportPanel extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            modal: false
        };
    }

    onOk(){
        console.log('点击确定按钮回调函数');
    }

    onClose(){
        console.log('点击取消按钮回调函数');
    }


    render () {
        return (
            <div>
                <Modal
                    title="测试标题"
                    btn={['确定','取消']}
                    visible={this.state.modal}
                    callback={this.onOk.bind(this)}
                    onClose={this.onClose.bind(this)}
                    width={500}>
                    <div>content.</div>
                </Modal>
                <a onClick={()=>this.setState({modal:true})}>显示弹窗</a>
            </div>
        );
    }
}

export default ImportAndExportPanel;
```
### confrim
``` javascript
import {Confrim} from '../../components/Modal';

...

constructor (props){
    super(props);
    this.state = {
        confrim: false
    };
}

<Confrim visible={this.state.confrim}
    onClose={()=>this.setState({confrim: false})}
    onOk={()=>console.log('确定按钮回调')}>
    <p>你确定要删除吗？</p>
</Confrim>

<a onClick={()=>this.setState({confrim:true})}>显示弹窗</a>
```
### alert
``` javascript
import {Alert} from '../../components/Modal';

...

constructor (props){
    super(props);
    this.state = {
        alert: false
    };
}
<Alert
    visible={this.state.alert}
    onClose={()=>this.setState({alert: false})}>
    <p>提示消息</p>
</Alert>

<a onClick={()=>this.setState({msg:true})}>显示弹窗</a>
```
### msg
``` javascript
import {Msg} from '../../components/Modal';

...

constructor (props){
    super(props);
    this.state = {
        msg: false
    };
}
<Alert
    visible={this.state.msg}
    onClose={()=>this.setState({msg: false})}
    time={2}>
    <p>提示消息</p>
</Alert>

<a onClick={()=>this.setState({msg:true})}>显示弹窗</a>
```
### loading
*Loading不会自动关闭，请手动关闭loading*
``` javascript
import { Loading } from '../../components/Modal';

...

constructor (props){
    super(props);
    this.state = {
        loading: false
    };
}
<Loading visible={this.state.loading} />

<a onClick={()=>this.setState({loading:true})}>显示弹窗</a>
```
***
## Props
Property|Type|Default|Description
---|---|---|---
width|number|400|width of dialog
height|number|300|height of dialog
onClose|func|/|onClose handler function
visible|bool|false|whether to show dialog
showMask|bool|true|whether to show mask
showCloseButton|bool|true|whether to show close button
animation|string|zoom|animation type
duration|number|300|animation duration
className|string|/|className for the container
customStyles|object|/|custom styles
customMaskStyles|object|/|custom mask styles
title|string|/|标题
btn|array|/|按钮文字，如['确定','取消']
callback|func|/|点击‘确定’按钮回调函数
time|number|2|Msg组件参数，自动关闭时长
text|string|'正在加载...'|Loading组件参数，loading加载提示文字
isMaskClose|bool|true|点击遮罩层是否关闭弹窗，true：即关闭，false：不关闭

对于需要提供多个操作按钮的情况，请使用自定义按钮来分别定制按钮文字、样式、回调，并关闭默认按钮显示。

## Animation Types
* zoom
* fade
* flip
* door
* rotate
* slideUp
* slideDown
* slideLeft
* slideRight
