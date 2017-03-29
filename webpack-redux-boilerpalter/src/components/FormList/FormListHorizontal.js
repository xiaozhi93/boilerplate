import React, { Component } from 'react';
import { createForm } from 'rc-form';
import {Input,TextArea,Select,RadioGroup} from '../Validator';
import './../../static/FormList.css';
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
                        <label className="col-ls-1 form-control-label">水平多选</label>
                        <div className="col-ls-10">
                            <label className="form-inline-items">
                                <input type="checkbox" value="option1" name="checkbox1"/> 选项1
                            </label>
                            <label className="form-inline-items">
                                <input type="checkbox" value="option1" name="checkbox1"/> 选项2
                            </label>
                            <label className="form-inline-items">
                                <input type="checkbox" value="option1" name="checkbox1"/> 选项3
                            </label>
                        </div>
                </div>

                <div className="form-group form-group-vertical">
                    <label className="col-ls-1 form-control-label">垂直多选</label>
                    <div className="col-ls-10">
                        <label className="form-block-items">
                            <input type="checkbox" name="checkbox2"/> 垂直多选项1
                        </label>
                        <label className="form-block-items">
                            <input type="checkbox" name="checkbox2"/> 垂直多选项2
                        </label>
                        <label className="form-block-items">
                            <input type="checkbox" name="checkbox2"/> 垂直多选项3
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    {/*<FileUpload files={[]}/>*/}
                    <label htmlFor="" className="col-ls-1 form-control-label">图片上传</label>
                    <div className="col-ls-4 pic-upload-btn">

                        <a id="upload" className="btn btn-primary" href="javascript:void(0);">上传照片</a>
                        <input style={{width:90,marginTop:-25,opacity:0}} id="upfile" name="file" type="file"
                               className="file-input" onChange={()=>{console.log("123")}}/>
                    </div>
                    <div className="col-ls-10 col-ls-offset">
                        <div className="form-pic-info">
                            <div className="form-pic-show">
                                <img id="imgId" alt="" src="" width="160" height="80"/>
                            </div>
                            <p className="form-pic-tips">
                                <a href="javascript:void(0)" onClick="">
                                    <img src="http://www.51vj.cn/images/upload-close.png"/>
                                </a>
                                <span className="red">*&nbsp;</span>建议使用640X320像素的图片，仅支持
                                <span className="red">png、jpg</span>图片
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="" className="col-ls-1 form-control-label">附件上传</label>
                    <div className="col-ls-10">
                        <div id="file-upload" className="uploadify">
                            <object id="SWFUpload_0" type="application/x-shockwave-flash" data="" width="40" height="40" className="swfupload" style={{position:'absolute',zIndex:1}}>

                            </object>
                            <div id="file-upload-button" className="uploadify-button" style={{height: 40, width: 40}}>
                                <span className="uploadify-button-text"></span>
                            </div>
                        </div>
                        <p className="red">仅支持doc.pdf.类型文件</p>
                        <ul>
                            <li></li>
                        </ul>
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
