# 表单验证组件
***
该组件为 [rc-form](https://github.com/react-component/form) 组件的封装。
## Usage
``` javascript
import { createForm } from 'rc-form';
import {Input,TextArea,Select,RadioGroup} from '../Validator';

class FormListHorizontal extends Component {
    //提交表单
    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.submit((callback) => {
            this.props.form.validateFields((error, values) => {
                if (!error) {
                    console.log('ok', values);
                } else {
                    console.log('error', error, values);
                }
                callback();
            });
        });
    };
    render() {
        const { form } = this.props;
        const disabled = form.isFieldsValidating() || form.isSubmitting();
        return (
            <form action="" className="form-horizontal" onSubmit={this.onSubmit}>
                <h3 className="form-title">水平排列表单</h3>
                <div className="form-group">
                    <label htmlFor="user" className="col-ls-1 form-control-label">
                        <span className="red form-mr">*</span>用户名
                    </label>
                    <div className="col-ls-4">
                        <Input {...form} required name="user" type="text" errorPlace="right" rule={{type: 'string',max:8}} onChange={(value)=>{console.log(value)}} className="form-control" placeholder="请输入用户名" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="psw" className="col-ls-1 form-control-label">
                        <span className="red form-mr">*</span>密码
                    </label>
                    <div className="col-ls-4">
                        <Input {...form} required name="psw" type="password" className="form-control" placeholder="请输入密码" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-ls-1 form-control-label">日期</label>
                    <div className="col-ls-4">
                        <Input {...form} name="date" type="date" className="form-control" placeholder="选择日期时间"  />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-ls-1 form-control-label">日期起止</label>
                    <div className="col-ls-4">
                        <Input {...form} name="startDate" type="date" className="form-control form-control-date" inlineBlock placeholder="选择日期时间"  />
                        <label className="form-control-label form-split-dash">-</label>
                        <Input {...form} name="endDate" type="date" className="form-control form-control-date" inlineBlock placeholder="选择日期时间"  />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="" className="col-ls-1 form-control-label">已选题量</label>
                    <div className="col-ls-4">
                        <input type="text" className="form-control" disabled/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-ls-1 form-control-label">文本域</label>
                    <div className="col-ls-10">
                        <TextArea {...form} required name="textField" rule={{type: 'string',max:8}} onChange={(value)=>{console.log(value)}} className="form-control"  rows="5" placeholder="请输入文本域" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-ls-1 form-control-label">文本域</label>
                    <div className="col-ls-2">
                        <button className="btn btn-primary">选择模板</button>
                    </div>
                    <div className="col-ls-10 col-ls-offset">
                        <TextArea {...form} name="textField1" rule={{type: 'string',max:200}} className="form-control"  rows="5" placeholder="请输入文本域1" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-ls-1 form-control-label"><span className="red form-mr">*</span>下拉框</label>
                    <div className="col-ls-4">
                        <Select {...form} className="form-control" value="222" name="select1" required>
                            <option value="">请选择</option>
                            <option value="222">2</option>
                            <option value="333">3</option>
                            <option value="444">4</option>
                            <option value="555">5</option>
                        </Select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-ls-1 form-control-label">水平单选</label>
                    <div className="col-ls-10">
                        <RadioGroup {...form} name="radio1" value="11"  required>
                            <label className="form-inline-items">
                                <input type="radio" value="11" defaultChecked  name="radio1" /> 我是选项描述1
                            </label>
                            <label className="form-inline-items">
                                <input type="radio" value="22"  name="radio1"/> 我是选项描述2
                            </label>
                        </RadioGroup>
                    </div>
                </div>
                <div className="form-group form-group-vertical">
                    <label className="col-ls-1 form-control-label">垂直单选</label>
                    <div className="col-ls-10">
                        <RadioGroup {...form} name="radio2"   required>
                            <label className="form-block-items">
                                <input type="radio" value="radio111" name="radio2"  onChange={()=>{}}/> 垂直单选1
                            </label>
                            <label className="form-block-items">
                                <input type="radio" value="radio222" name="radio2"/> 垂直单选2
                            </label>
                            <label className="form-block-items">
                                <input type="radio" value="radio333" name="radio2"/> 垂直单选3
                            </label>
                        </RadioGroup>
                    </div>
                </div>
                <div className="form-group">
                    <button disabled={disabled} type="submit" className="btn btn-primary" style={{width:'50px',height:'30px',marginRight:'30px'}}> {disabled?"验证中": "提交"}</button>
                </div>
            </form>
        );
    }
}
export default  createForm()(FormListHorizontal);

```
## 表单 ##


## 表单组件 ##
### Input组件 ###
*** 属性 ***
字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
{...form} | object | ``''`` | 验证API方法，必须填
required | ```` | 必填组件（默认提示“必填选项“）
name| string | ``undefined`` | 组件名，必填属性。
type | string | ``text`` | input类型，默认是text类型
rule | object | ``''`` | 表单验证规则。
errorPlace | string | ``bottom`` | 错误信息提示位置。
inlineBlock | ```` | 表示是行内样式，用于一行展示多个组件，如一行展示多个Input组件
onChange | func | onchange回调事件，参数value
### TextArea组件 ###
*** 属性 ***
字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
{...form} | object | ``''`` | 验证API方法，必须填
required | ```` | 必填组件（默认提示“必填选项“）
name| string | ``undefined`` | 组件名，必填属性。
type | string | ``text`` | input类型，默认是text类型
rule | object | ``''`` | 表单验证规则。
errorPlace | string | ``bottom`` | 错误信息提示位置。
inlineBlock | ```` | 表示是行内样式，用于一行展示多个组件，如一行展示多个Input组件
onChange | func | onchange回调事件，参数value
### Select组件 ###
*** 属性 ***
字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
{...form} | object | ``''`` | 验证API方法，必须填
required | ```` | 必填组件（默认提示“必填选项“）
name| string | ``undefined`` | 组件名，必填属性。
errorPlace | string | ``bottom`` | 错误信息提示位置。
### RadioGroup组件 ###
*** 属性 ***
字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
{...form} | object | ``''`` | 验证API方法，必须填
required | ```` | 必填组件（默认提示“必填选项“）
name| string | ``undefined`` | 组件名，必填属性。
errorPlace | string | ``bottom`` | 错误信息提示位置。
