import React, { Component } from 'react';
import css from './DropDown.css';

class DropDown extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  };
  handleToggle(e) {
    e.stopPropagation();
    const name = 'isShow';
    this.setState({
      [name]: !this.state[name]
    });
  };
  render(){
    const { clickMode, className, btnText, items } = this.props;
    const open = this.state.isShow ? css.open : '';
    return (
      <div
        className={`${clickMode ? css.clickDown : css.dropDown} ${className} ${open}`}
        onClick={clickMode ? this.handleToggle : ''}
      >
        {btnText}
        <div className={css.cont}>
          <ul className={css.menu}>
            {items.map((node, i) =>
              <li
                key={i}
                className={css.item}
                onClick={node.onClick}
              >
                {node.text}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };
};

export default DropDown;
