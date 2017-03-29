import React, { Component } from 'react';
import css from './Select.css';

function offSetTop(el) {
  let top = 0;
  const loop = (el) => {
    top += el.offsetTop || 0;
    if (el.offsetParent) {
      loop(el.offsetParent);
    };
  };
  loop(el);
  return top;
};

function getObject(child) {
  let obj = {
    options: [],
    keyValue: {}
  };
  child.forEach(item => {
    obj.keyValue[item.props.value] = item.props.children;
    obj.options.push({
      text: item.props.children,
      value: item.props.value
    });
  });
  return obj;
};

class Select extends Component{
  constructor(props) {
    super(props);
    const { children, value } = this.props;
    const { options, keyValue } = getObject(children || []);
    this.value = value || '';
    this.text = keyValue[value] || '';
    this.state = {
      value: this.value,
      text: this.text,
      options: options,
      isShow: false
    };
    this.isReverse = false;
    this.bodyClick = this.bodyClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  };
  componentDidMount(){
    document.addEventListener('click', this.bodyClick);
    console.log(document.body.clientHeight, offSetTop(this.refs.select))
    if ((document.body.clientHeight - offSetTop(this.refs.select)) < 200) {
      this.isReverse = true;
    };
  }
  componentWillReceiveProps(nextProps) {
    const { children, value } = nextProps;
    const { options, keyValue } = getObject(children || []);
    this.value = value || '';
    this.text = keyValue[value] || '';
    this.setState({
      value: this.value,
      text: this.text,
      options: options,
      isShow: false
    });
  };
  componentWillUnmount(){
    document.body.removeEventListener('click', this.bodyClick);
  };
  bodyClick() {
    if(this.state.isShow){
      this.setState({
        isShow: false
      });
    };
  };
  handleClick(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      isShow: !this.state['isShow']
    });
  };
  handleSelect(e) {
    const value = e.target.dataset.value;
    const text = e.target.textContent;
    if (this.value !== value) {
      this.value = value;
      this.text = text;
      this.setState({
        text: text,
        value: value
      });
      this.props.onChange && this.props.onChange(value);
    };
  };
  render(){
    const { className } = this.props;
    const { value, text, isShow, options } = this.state;
    return (
      <label
        className={`${css.select}${isShow ? (' '+ css.active) : ''}${className ? (' '+ className) : ''}${this.isReverse ? (' '+ css.reverse) : ''}`}
        onClick={this.handleClick}
        ref="select"
      >
        <a className={css.text}>
          {text}
        </a>
        <div className={css.cont}>
          <ul className={css.menu}>
            {options.map((item, i) =>
              <li
                key={i}
                className={css.item}
                data-value={item.value}
                onClick={this.handleSelect}
              >
                {item.text}
              </li>
            )}
          </ul>
        </div>
      </label>
    );
  };
};

export default Select;
