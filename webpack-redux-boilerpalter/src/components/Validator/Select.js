import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import css from './css/Validator.css';

class Select extends Component{
	constructor(props) {
		super(props);
	};
	render() {
		const { getFieldProps, getFieldError,name,value} = this.props;
		const cs = classnames.bind(css);
		const errors = getFieldError(name);
		let validateRule=[];
		if(this.props.required){
			validateRule.push({
				required: true,
				message: '必填选项'
			});
		};
		return (<div className={css.formGroup}>
			<div>
				<select className={this.props.className}
					{...getFieldProps(name, {
						validateFirst: true,
						initialValue:value,
						rules: validateRule,
						validateTrigger: 'onChange'
					})}>
					{this.props.children}
				</select>
			</div>
			{errors? <span className={cs(css.formError,this.props.errorPlace)}>
				       {errors.join(',')}
							 </span>:""
			}
		</div>);
		}
};
Select.defaultProps={
	value:"",
	errorPlace:"bottom"
}
export default Select;
