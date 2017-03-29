import React, { Component} from 'react';
import classnames from 'classnames/bind';
import css from './css/Validator.css';

class TextArea extends Component{
	constructor(props) {
		super(props);
		this.state = {
			length:0
		};
		this.updateLength = this.updateLength.bind(this);
		this.handleChange = this.handleChange.bind(this)
	};
	componentDidMount(){
		this.setState({
			length: this.props.getFieldValue(this.props.name).length
		})
	}
	updateLength(event){
		if(this.props.rule&&this.props.rule.max){
			if(event.target.value.length>this.props.rule.max){
				let nameValue=event.target.value.substr(0,this.props.rule.max);
				event.target.value=nameValue;
			}
		}
		this.setState({
			length: this.props.getFieldValue(this.props.name).length
		})
	}
	handleChange (event) {
		this.updateLength(event);
		let value = event.target.value;
		if(this.props.onChange){
			this.props.onChange(value)
		}
	}

	render() {
		const { getFieldProps, getFieldError,name,placeholder,value} = this.props;
		const cs = classnames.bind(css);
		const errors = getFieldError(name);
		let validateRule=[];
		if(this.props.required){
			validateRule.push({
				required: true,
				message: '必填选项'
			});
		};
		if(this.props.rule){
			validateRule.push(this.props.rule);
		}
		if(this.props.customValidate){
			validateRule.push(this.props.customValidate);
		}
		return (<div className={css.formGroup}>
			<div >
				<textarea className={this.props.className} rows={this.props.rows} maxLength={this.props.rule&&this.props.rule.max?this.props.rule.max:""}
					onKeyUp={this.handleChange}
					placeholder={placeholder}
					{...getFieldProps(name, {
						validateFirst: true,
						initialValue:value,
						rules: validateRule,
						validateTrigger: 'onInput'
					})}
				/>
				{ this.props.rule&&this.props.rule.max?<span className={css.formTip}>{this.state.length}/{this.props.rule.max}</span>:""}
			</div>
			{errors? <span className={cs(css.formError,this.props.errorPlace)}>
				       {errors.join(',')}
							 </span>:""
			}
		</div>);
		}
};
TextArea.defaultProps={
	value:"",
	placeholder:"",
	errorPlace:"bottom"
}
export default TextArea;
