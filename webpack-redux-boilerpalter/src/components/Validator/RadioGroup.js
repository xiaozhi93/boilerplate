import React, { Component} from 'react';
import classnames from 'classnames/bind';
import css from './css/Validator.css';

class RadioGroup extends Component{
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
	};
	handleChange (event) {
		let value = event.target.value;
		if(this.props.onChange){
			this.props.onChange(value)
		}
	}
	render() {
		const cs = classnames.bind(css);
		const value=this.props.value?this.props.value:"";
		const { getFieldProps, getFieldError,name} = this.props;
		const errors = getFieldError(name);
		let validateRule=[];
		if(this.props.required){
			validateRule.push({
				required: true,
				message: '必填选项'
			});
		};
		return (<div className={css.formGroup}>
			<div >
				<radiogroup className={this.props.className} onChange={this.handleChange}
					{...getFieldProps(name, {
						validateFirst: true,
						initialValue:value,
						rules: validateRule,
						validateTrigger: 'onChange'
					})}>
					{this.props.children}
				</radiogroup>
			</div>
			{errors? <span className={cs(css.formError,this.props.errorPlace)}>
				       {errors.join(',')}
							 </span>:""
			}
		</div>);
	}
};

export default RadioGroup;

