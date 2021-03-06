'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _KeyCode = require('rc-util/lib/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _componentClasses = require('component-classes');

var _componentClasses2 = _interopRequireDefault(_componentClasses);

var _util = require('./util');

var _SelectTrigger = require('./SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

var _FilterMixin = require('./FilterMixin');

var _FilterMixin2 = _interopRequireDefault(_FilterMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}

function filterFn(input, child) {
  return String((0, _util.getPropValue)(child, this.props.optionFilterProp)).indexOf(input) > -1;
}

function saveRef(name, component) {
  this[name] = component;
}

var valueObjectShape = void 0;

if (_react.PropTypes) {
  valueObjectShape = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
    key: _react.PropTypes.string,
    label: _react.PropTypes.node
  })]);
}

var Select = _react2["default"].createClass({
  displayName: 'Select',

  propTypes: {
    defaultActiveFirstOption: _react.PropTypes.bool,
    multiple: _react.PropTypes.bool,
    filterOption: _react.PropTypes.any,
    children: _react.PropTypes.any,
    showSearch: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    allowClear: _react.PropTypes.bool,
    showArrow: _react.PropTypes.bool,
    tags: _react.PropTypes.bool,
    prefixCls: _react.PropTypes.string,
    className: _react.PropTypes.string,
    transitionName: _react.PropTypes.string,
    optionLabelProp: _react.PropTypes.string,
    optionFilterProp: _react.PropTypes.string,
    animation: _react.PropTypes.string,
    choiceTransitionName: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    onBlur: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    onSearch: _react.PropTypes.func,
    placeholder: _react.PropTypes.any,
    onDeselect: _react.PropTypes.func,
    labelInValue: _react.PropTypes.bool,
    value: _react.PropTypes.oneOfType([valueObjectShape, _react.PropTypes.arrayOf(valueObjectShape)]),
    defaultValue: _react.PropTypes.oneOfType([valueObjectShape, _react.PropTypes.arrayOf(valueObjectShape)]),
    dropdownStyle: _react.PropTypes.object,
    maxTagTextLength: _react.PropTypes.number,
    tokenSeparators: _react.PropTypes.arrayOf(_react.PropTypes.string),
    getInputElement: _react.PropTypes.func
  },

  mixins: [_FilterMixin2["default"]],

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-select',
      filterOption: filterFn,
      defaultOpen: false,
      labelInValue: false,
      defaultActiveFirstOption: true,
      showSearch: true,
      allowClear: false,
      placeholder: '',
      defaultValue: [],
      onChange: noop,
      onFocus: noop,
      onBlur: noop,
      onSelect: noop,
      onSearch: noop,
      onDeselect: noop,
      showArrow: true,
      dropdownMatchSelectWidth: true,
      dropdownStyle: {},
      dropdownMenuStyle: {},
      optionFilterProp: 'value',
      optionLabelProp: 'value',
      notFoundContent: 'Not Found'
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var value = [];
    if ('value' in props) {
      value = (0, _util.toArray)(props.value);
    } else {
      value = (0, _util.toArray)(props.defaultValue);
    }
    value = this.addLabelToValue(props, value);
    value = this.addTitleToValue(props, value);
    var inputValue = '';
    if (props.combobox) {
      inputValue = value.length ? this.getLabelFromProps(props, value[0].key) : '';
    }
    this.saveInputRef = saveRef.bind(this, 'inputInstance');
    this.saveInputMirrorRef = saveRef.bind(this, 'inputMirrorInstance');
    var open = props.open;
    if (open === undefined) {
      open = props.defaultOpen;
    }
    return {
      value: value,
      inputValue: inputValue,
      open: open
    };
  },
  componentWillMount: function componentWillMount() {
    this.adjustOpenState();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      var value = (0, _util.toArray)(nextProps.value);
      value = this.addLabelToValue(nextProps, value);
      value = this.addTitleToValue(nextProps, value);
      this.setState({
        value: value
      });
      if (nextProps.combobox) {
        this.setState({
          inputValue: value.length ? this.getLabelFromProps(nextProps, value[0].key) : ''
        });
      }
    }
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    this.props = nextProps;
    this.state = nextState;
    this.adjustOpenState();
  },
  componentDidUpdate: function componentDidUpdate() {
    if ((0, _util.isMultipleOrTags)(this.props)) {
      var inputNode = this.getInputDOMNode();
      var mirrorNode = this.getInputMirrorDOMNode();
      if (inputNode.value) {
        inputNode.style.width = '';
        inputNode.style.width = mirrorNode.clientWidth + 'px';
      } else {
        inputNode.style.width = '';
      }
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.clearBlurTime();
    this.clearAdjustTimer();
    if (this.dropdownContainer) {
      _reactDom2["default"].unmountComponentAtNode(this.dropdownContainer);
      document.body.removeChild(this.dropdownContainer);
      this.dropdownContainer = null;
    }
  },
  onInputChange: function onInputChange(event) {
    var tokenSeparators = this.props.tokenSeparators;

    var val = event.target.value;
    if ((0, _util.isMultipleOrTags)(this.props) && tokenSeparators && (0, _util.includesSeparators)(val, tokenSeparators)) {
      var nextValue = this.tokenize(val);
      this.fireChange(nextValue);
      this.setOpenState(false, true);
      this.setInputValue('', false);
      return;
    }
    this.setInputValue(val);
    this.setState({
      open: true
    });
    if ((0, _util.isCombobox)(this.props)) {
      this.fireChange([{
        key: val
      }]);
    }
  },
  onDropdownVisibleChange: function onDropdownVisibleChange(open) {
    this.setOpenState(open);
  },


  // combobox ignore
  onKeyDown: function onKeyDown(event) {
    var props = this.props;
    if (props.disabled) {
      return;
    }
    var keyCode = event.keyCode;
    if (this.state.open && !this.getInputDOMNode()) {
      this.onInputKeyDown(event);
    } else if (keyCode === _KeyCode2["default"].ENTER || keyCode === _KeyCode2["default"].DOWN) {
      this.setOpenState(true);
      event.preventDefault();
    }
  },
  onInputKeyDown: function onInputKeyDown(event) {
    var props = this.props;
    if (props.disabled) {
      return;
    }
    var state = this.state;
    var keyCode = event.keyCode;
    if ((0, _util.isMultipleOrTags)(props) && !event.target.value && keyCode === _KeyCode2["default"].BACKSPACE) {
      event.preventDefault();
      var value = state.value;

      if (value.length) {
        this.removeSelected(value[value.length - 1].key);
      }
      return;
    }
    if (keyCode === _KeyCode2["default"].DOWN) {
      if (!state.open) {
        this.openIfHasChildren();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } else if (keyCode === _KeyCode2["default"].ESC) {
      if (state.open) {
        this.setOpenState(false);
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }

    if (state.open) {
      var menu = this.refs.trigger.getInnerMenu();
      if (menu && menu.onKeyDown(event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },
  onMenuSelect: function onMenuSelect(_ref) {
    var _this = this;

    var item = _ref.item;

    var value = this.state.value;
    var props = this.props;
    var selectedValue = (0, _util.getValuePropValue)(item);
    var selectedLabel = this.getLabelFromOption(item);
    var event = selectedValue;
    if (props.labelInValue) {
      event = {
        key: event,
        label: selectedLabel
      };
    }
    props.onSelect(event, item);
    var selectedTitle = item.props.title;
    if ((0, _util.isMultipleOrTags)(props)) {
      if ((0, _util.findIndexInValueByKey)(value, selectedValue) !== -1) {
        return;
      }
      value = value.concat([{
        key: selectedValue,
        label: selectedLabel,
        title: selectedTitle
      }]);
    } else {
      if ((0, _util.isCombobox)(props)) {
        this.skipAdjustOpen = true;
        this.clearAdjustTimer();
        this.skipAdjustOpenTimer = setTimeout(function () {
          _this.skipAdjustOpen = false;
        }, 0);
      }
      if (value.length && value[0].key === selectedValue) {
        this.setOpenState(false, true);
        return;
      }
      value = [{
        key: selectedValue,
        label: selectedLabel,
        title: selectedTitle
      }];
      this.setOpenState(false, true);
    }
    this.fireChange(value);
    var inputValue = void 0;
    if ((0, _util.isCombobox)(props)) {
      inputValue = (0, _util.getPropValue)(item, props.optionLabelProp);
    } else {
      inputValue = '';
    }
    this.setInputValue(inputValue, false);
  },
  onMenuDeselect: function onMenuDeselect(_ref2) {
    var item = _ref2.item,
        domEvent = _ref2.domEvent;

    if (domEvent.type === 'click') {
      this.removeSelected((0, _util.getValuePropValue)(item));
    }
    this.setInputValue('', false);
  },
  onArrowClick: function onArrowClick(e) {
    e.stopPropagation();
    if (!this.props.disabled) {
      this.setOpenState(!this.state.open, !this.state.open);
    }
  },
  onPlaceholderClick: function onPlaceholderClick() {
    if (this.getInputDOMNode()) {
      this.getInputDOMNode().focus();
    }
  },
  onOuterFocus: function onOuterFocus(e) {
    if (!(0, _util.isMultipleOrTagsOrCombobox)(this.props) && e.target === this.getInputDOMNode()) {
      return;
    }
    this.clearBlurTime();
    this._focused = true;
    this.updateFocusClassName();
    this.props.onFocus();
  },
  onPopupFocus: function onPopupFocus() {
    // fix ie scrollbar, focus element again
    this.maybeFocus(true, true);
  },
  onOuterBlur: function onOuterBlur() {
    var _this2 = this;

    this.blurTimer = setTimeout(function () {
      _this2._focused = false;
      _this2.updateFocusClassName();
      var props = _this2.props;
      var value = _this2.state.value;
      var inputValue = _this2.state.inputValue;

      if ((0, _util.isSingleMode)(props) && props.showSearch && inputValue && props.defaultActiveFirstOption) {
        var options = _this2._options || [];
        if (options.length) {
          var firstOption = (0, _util.findFirstMenuItem)(options);
          if (firstOption) {
            value = [{
              key: firstOption.key,
              label: _this2.getLabelFromOption(firstOption)
            }];
            _this2.fireChange(value);
          }
        }
      } else if ((0, _util.isMultipleOrTags)(props) && inputValue) {
        // why not use setState?
        _this2.state.inputValue = _this2.getInputDOMNode().value = '';
      }
      props.onBlur(_this2.getVLForOnChange(value));
    }, 10);
  },
  onClearSelection: function onClearSelection(event) {
    var props = this.props;
    var state = this.state;
    if (props.disabled) {
      return;
    }
    var inputValue = state.inputValue,
        value = state.value;

    event.stopPropagation();
    if (inputValue || value.length) {
      if (value.length) {
        this.fireChange([]);
      }
      this.setOpenState(false, true);
      if (inputValue) {
        this.setInputValue('');
      }
    }
  },
  onChoiceAnimationLeave: function onChoiceAnimationLeave() {
    this.refs.trigger.refs.trigger.forcePopupAlign();
  },
  getLabelBySingleValue: function getLabelBySingleValue(children, value) {
    var _this3 = this;

    if (value === undefined) {
      return null;
    }
    var label = null;
    _react2["default"].Children.forEach(children, function (child) {
      if (child.type.isSelectOptGroup) {
        var maybe = _this3.getLabelBySingleValue(child.props.children, value);
        if (maybe !== null) {
          label = maybe;
        }
      } else if ((0, _util.getValuePropValue)(child) === value) {
        label = _this3.getLabelFromOption(child);
      }
    });
    return label;
  },
  getValueByLabel: function getValueByLabel(children, label) {
    var _this4 = this;

    if (label === undefined) {
      return null;
    }
    var value = null;
    _react2["default"].Children.forEach(children, function (child) {
      if (child.type.isSelectOptGroup) {
        var maybe = _this4.getValueByLabel(child.props.children, label);
        if (maybe !== null) {
          value = maybe;
        }
      } else if ((0, _util.toArray)(_this4.getLabelFromOption(child)).join('') === label) {
        value = (0, _util.getValuePropValue)(child);
      }
    });
    return value;
  },
  getLabelFromOption: function getLabelFromOption(child) {
    return (0, _util.getPropValue)(child, this.props.optionLabelProp);
  },
  getLabelFromProps: function getLabelFromProps(props, value) {
    return this.getLabelByValue(props.children, value);
  },
  getVLForOnChange: function getVLForOnChange(vls_) {
    var vls = vls_;
    if (vls !== undefined) {
      if (!this.props.labelInValue) {
        vls = vls.map(function (v) {
          return v.key;
        });
      } else {
        vls = vls.map(function (vl) {
          return { key: vl.key, label: vl.label };
        });
      }
      return (0, _util.isMultipleOrTags)(this.props) ? vls : vls[0];
    }
    return vls;
  },
  getLabelByValue: function getLabelByValue(children, value) {
    var label = this.getLabelBySingleValue(children, value);
    if (label === null) {
      return value;
    }
    return label;
  },
  getDropdownContainer: function getDropdownContainer() {
    if (!this.dropdownContainer) {
      this.dropdownContainer = document.createElement('div');
      document.body.appendChild(this.dropdownContainer);
    }
    return this.dropdownContainer;
  },
  getPlaceholderElement: function getPlaceholderElement() {
    var props = this.props,
        state = this.state;

    var hidden = false;
    if (state.inputValue) {
      hidden = true;
    }
    if (state.value.length) {
      hidden = true;
    }
    if ((0, _util.isCombobox)(props) && state.value.length === 1 && !state.value[0].key) {
      hidden = false;
    }
    var placeholder = props.placeholder;
    if (placeholder) {
      return _react2["default"].createElement(
        'div',
        (0, _extends3["default"])({
          onMouseDown: _util.preventDefaultEvent,
          style: (0, _extends3["default"])({
            display: hidden ? 'none' : 'block'
          }, _util.UNSELECTABLE_STYLE)
        }, _util.UNSELECTABLE_ATTRIBUTE, {
          onClick: this.onPlaceholderClick,
          className: props.prefixCls + '-selection__placeholder'
        }),
        placeholder
      );
    }
    return null;
  },
  getInputElement: function getInputElement() {
    var props = this.props;
    var inputElement = props.getInputElement ? props.getInputElement() : _react2["default"].createElement('input', null);
    var inputCls = (0, _classnames3["default"])(inputElement.props.className, (0, _defineProperty3["default"])({}, props.prefixCls + '-search__field', true));
    // https://github.com/ant-design/ant-design/issues/4992#issuecomment-281542159
    // Add space to the end of the inputValue as the width measurement tolerance
    return _react2["default"].createElement(
      'div',
      { className: props.prefixCls + '-search__field__wrap' },
      _react2["default"].cloneElement(inputElement, {
        ref: this.saveInputRef,
        onChange: this.onInputChange,
        onKeyDown: this.onInputKeyDown,
        value: this.state.inputValue,
        disabled: props.disabled,
        className: inputCls
      }),
      _react2["default"].createElement(
        'span',
        {
          ref: this.saveInputMirrorRef,
          className: props.prefixCls + '-search__field__mirror'
        },
        this.state.inputValue,
        '\xA0'
      )
    );
  },
  getInputDOMNode: function getInputDOMNode() {
    return this.inputInstance;
  },
  getInputMirrorDOMNode: function getInputMirrorDOMNode() {
    return this.inputMirrorInstance;
  },
  getPopupDOMNode: function getPopupDOMNode() {
    return this.refs.trigger.getPopupDOMNode();
  },
  getPopupMenuComponent: function getPopupMenuComponent() {
    return this.refs.trigger.getInnerMenu();
  },
  setOpenState: function setOpenState(open, needFocus) {
    var _this5 = this;

    var props = this.props,
        state = this.state;

    if (state.open === open) {
      this.maybeFocus(open, needFocus);
      return;
    }
    var nextState = {
      open: open
    };
    // clear search input value when open is false in singleMode.
    if (!open && (0, _util.isSingleMode)(props) && props.showSearch) {
      this.setInputValue('');
    }
    if (!open) {
      this.maybeFocus(open, needFocus);
    }
    this.setState(nextState, function () {
      if (open) {
        _this5.maybeFocus(open, needFocus);
      }
    });
  },
  setInputValue: function setInputValue(inputValue) {
    var fireSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (inputValue !== this.state.inputValue) {
      this.setState({
        inputValue: inputValue
      });
      if (fireSearch) {
        this.props.onSearch(inputValue);
      }
    }
  },
  clearBlurTime: function clearBlurTime() {
    if (this.blurTimer) {
      clearTimeout(this.blurTimer);
      this.blurTimer = null;
    }
  },
  clearAdjustTimer: function clearAdjustTimer() {
    if (this.skipAdjustOpenTimer) {
      clearTimeout(this.skipAdjustOpenTimer);
      this.skipAdjustOpenTimer = null;
    }
  },
  updateFocusClassName: function updateFocusClassName() {
    var refs = this.refs,
        props = this.props;
    // avoid setState and its side effect

    if (this._focused) {
      (0, _componentClasses2["default"])(refs.root).add(props.prefixCls + '-focused');
    } else {
      (0, _componentClasses2["default"])(refs.root).remove(props.prefixCls + '-focused');
    }
  },
  maybeFocus: function maybeFocus(open, needFocus) {
    if (needFocus || open) {
      var input = this.getInputDOMNode();
      var _document = document,
          activeElement = _document.activeElement;

      if (input && (open || (0, _util.isMultipleOrTagsOrCombobox)(this.props))) {
        if (activeElement !== input) {
          input.focus();
        }
      } else {
        var selection = this.refs.selection;
        if (activeElement !== selection) {
          selection.focus();
        }
      }
    }
  },
  addLabelToValue: function addLabelToValue(props, value_) {
    var _this6 = this;

    var value = value_;
    if (props.labelInValue) {
      value.forEach(function (v) {
        v.label = v.label || _this6.getLabelFromProps(props, v.key);
      });
    } else {
      value = value.map(function (v) {
        return {
          key: v,
          label: _this6.getLabelFromProps(props, v)
        };
      });
    }
    return value;
  },
  addTitleToValue: function addTitleToValue(props, values) {
    var _this7 = this;

    var nextValues = values;
    var keys = values.map(function (v) {
      return v.key;
    });
    _react2["default"].Children.forEach(props.children, function (child) {
      if (child.type.isSelectOptGroup) {
        nextValues = _this7.addTitleToValue(child.props, nextValues);
      } else {
        var value = (0, _util.getValuePropValue)(child);
        var valueIndex = keys.indexOf(value);
        if (valueIndex > -1) {
          nextValues[valueIndex].title = child.props.title;
        }
      }
    });
    return nextValues;
  },
  removeSelected: function removeSelected(selectedKey) {
    var props = this.props;
    if (props.disabled || this.isChildDisabled(selectedKey)) {
      return;
    }
    var label = void 0;
    var value = this.state.value.filter(function (singleValue) {
      if (singleValue.key === selectedKey) {
        label = singleValue.label;
      }
      return singleValue.key !== selectedKey;
    });
    var canMultiple = (0, _util.isMultipleOrTags)(props);

    if (canMultiple) {
      var event = selectedKey;
      if (props.labelInValue) {
        event = {
          key: selectedKey,
          label: label
        };
      }
      props.onDeselect(event);
    }
    this.fireChange(value);
  },
  openIfHasChildren: function openIfHasChildren() {
    var props = this.props;
    if (_react2["default"].Children.count(props.children) || (0, _util.isSingleMode)(props)) {
      this.setOpenState(true);
    }
  },
  fireChange: function fireChange(value) {
    var props = this.props;
    if (!('value' in props)) {
      this.setState({
        value: value
      });
    }
    props.onChange(this.getVLForOnChange(value));
  },
  isChildDisabled: function isChildDisabled(key) {
    return (0, _util.toArray)(this.props.children).some(function (child) {
      var childValue = (0, _util.getValuePropValue)(child);
      return childValue === key && child.props && child.props.disabled;
    });
  },
  tokenize: function tokenize(string) {
    var _this8 = this;

    var _props = this.props,
        multiple = _props.multiple,
        tokenSeparators = _props.tokenSeparators,
        children = _props.children;

    var nextValue = this.state.value;
    (0, _util.splitBySeparators)(string, tokenSeparators).forEach(function (label) {
      var selectedValue = { key: label, label: label };
      if ((0, _util.findIndexInValueByLabel)(nextValue, label) === -1) {
        if (multiple) {
          var value = _this8.getValueByLabel(children, label);
          if (value) {
            selectedValue.key = value;
            nextValue = nextValue.concat(selectedValue);
          }
        } else {
          nextValue = nextValue.concat(selectedValue);
        }
      }
    });
    return nextValue;
  },
  adjustOpenState: function adjustOpenState() {
    if (this.skipAdjustOpen) {
      return;
    }
    var open = this.state.open;

    if (typeof document !== 'undefined' && this.getInputDOMNode() && document.activeElement === this.getInputDOMNode()) {
      open = true;
    }
    var options = [];
    if (open) {
      options = this.renderFilterOptions();
    }
    this._options = options;
    if (open && ((0, _util.isMultipleOrTagsOrCombobox)(this.props) || !this.props.showSearch) && !options.length) {
      open = false;
    }
    this.state.open = open;
  },
  renderTopControlNode: function renderTopControlNode() {
    var _this9 = this;

    var _state = this.state,
        value = _state.value,
        open = _state.open,
        inputValue = _state.inputValue;

    var props = this.props;
    var choiceTransitionName = props.choiceTransitionName,
        prefixCls = props.prefixCls,
        maxTagTextLength = props.maxTagTextLength,
        showSearch = props.showSearch;

    var className = prefixCls + '-selection__rendered';
    // search input is inside topControlNode in single, multiple & combobox. 2016/04/13
    var innerNode = null;
    if ((0, _util.isSingleMode)(props)) {
      var selectedValue = null;
      if (value.length) {
        var showSelectedValue = false;
        var opacity = 1;
        if (!showSearch) {
          showSelectedValue = true;
        } else {
          if (open) {
            showSelectedValue = !inputValue;
            if (showSelectedValue) {
              opacity = 0.4;
            }
          } else {
            showSelectedValue = true;
          }
        }
        var singleValue = value[0];
        selectedValue = _react2["default"].createElement(
          'div',
          {
            key: 'value',
            className: prefixCls + '-selection-selected-value',
            title: singleValue.title || singleValue.label,
            style: {
              display: showSelectedValue ? 'block' : 'none',
              opacity: opacity
            }
          },
          value[0].label
        );
      }
      if (!showSearch) {
        innerNode = [selectedValue];
      } else {
        innerNode = [selectedValue, _react2["default"].createElement(
          'div',
          {
            className: prefixCls + '-search ' + prefixCls + '-search--inline',
            key: 'input',
            style: {
              display: open ? 'block' : 'none'
            }
          },
          this.getInputElement()
        )];
      }
    } else {
      var selectedValueNodes = [];
      if ((0, _util.isMultipleOrTags)(props)) {
        selectedValueNodes = value.map(function (singleValue) {
          var content = singleValue.label;
          var title = singleValue.title || content;
          if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
            content = content.slice(0, maxTagTextLength) + '...';
          }
          var disabled = _this9.isChildDisabled(singleValue.key);
          var choiceClassName = disabled ? prefixCls + '-selection__choice ' + prefixCls + '-selection__choice__disabled' : prefixCls + '-selection__choice';
          return _react2["default"].createElement(
            'li',
            (0, _extends3["default"])({
              style: _util.UNSELECTABLE_STYLE
            }, _util.UNSELECTABLE_ATTRIBUTE, {
              onMouseDown: _util.preventDefaultEvent,
              className: choiceClassName,
              key: singleValue.key,
              title: title
            }),
            _react2["default"].createElement(
              'div',
              { className: prefixCls + '-selection__choice__content' },
              content
            ),
            disabled ? null : _react2["default"].createElement('span', {
              className: prefixCls + '-selection__choice__remove',
              onClick: _this9.removeSelected.bind(_this9, singleValue.key)
            })
          );
        });
      }
      selectedValueNodes.push(_react2["default"].createElement(
        'li',
        {
          className: prefixCls + '-search ' + prefixCls + '-search--inline',
          key: '__input'
        },
        this.getInputElement()
      ));

      if ((0, _util.isMultipleOrTags)(props) && choiceTransitionName) {
        innerNode = _react2["default"].createElement(
          _rcAnimate2["default"],
          {
            onLeave: this.onChoiceAnimationLeave,
            component: 'ul',
            transitionName: choiceTransitionName
          },
          selectedValueNodes
        );
      } else {
        innerNode = _react2["default"].createElement(
          'ul',
          null,
          selectedValueNodes
        );
      }
    }
    return _react2["default"].createElement(
      'div',
      { className: className },
      this.getPlaceholderElement(),
      innerNode
    );
  },
  render: function render() {
    var _rootCls;

    var props = this.props;
    var multiple = (0, _util.isMultipleOrTags)(props);
    var state = this.state;
    var className = props.className,
        disabled = props.disabled,
        allowClear = props.allowClear,
        prefixCls = props.prefixCls;

    var ctrlNode = this.renderTopControlNode();
    var extraSelectionProps = {};
    var open = this.state.open;

    var options = this._options;
    if (!(0, _util.isMultipleOrTagsOrCombobox)(props)) {
      extraSelectionProps = {
        onKeyDown: this.onKeyDown,
        tabIndex: 0
      };
    }
    var rootCls = (_rootCls = {}, (0, _defineProperty3["default"])(_rootCls, className, !!className), (0, _defineProperty3["default"])(_rootCls, prefixCls, 1), (0, _defineProperty3["default"])(_rootCls, prefixCls + '-open', open), (0, _defineProperty3["default"])(_rootCls, prefixCls + '-focused', open || !!this._focused), (0, _defineProperty3["default"])(_rootCls, prefixCls + '-combobox', (0, _util.isCombobox)(props)), (0, _defineProperty3["default"])(_rootCls, prefixCls + '-disabled', disabled), (0, _defineProperty3["default"])(_rootCls, prefixCls + '-enabled', !disabled), (0, _defineProperty3["default"])(_rootCls, prefixCls + '-allow-clear', !!props.allowClear), _rootCls);
    var clearStyle = (0, _extends3["default"])({}, _util.UNSELECTABLE_STYLE, {
      display: 'none'
    });
    if (state.inputValue || state.value.length) {
      clearStyle.display = 'block';
    }
    var clear = _react2["default"].createElement('span', (0, _extends3["default"])({
      key: 'clear',
      onMouseDown: _util.preventDefaultEvent,
      style: clearStyle
    }, _util.UNSELECTABLE_ATTRIBUTE, {
      className: prefixCls + '-selection__clear',
      onClick: this.onClearSelection
    }));
    return _react2["default"].createElement(
      _SelectTrigger2["default"],
      {
        onPopupFocus: this.onPopupFocus,
        dropdownAlign: props.dropdownAlign,
        dropdownClassName: props.dropdownClassName,
        dropdownMatchSelectWidth: props.dropdownMatchSelectWidth,
        defaultActiveFirstOption: props.defaultActiveFirstOption,
        dropdownMenuStyle: props.dropdownMenuStyle,
        transitionName: props.transitionName,
        animation: props.animation,
        prefixCls: props.prefixCls,
        dropdownStyle: props.dropdownStyle,
        combobox: props.combobox,
        showSearch: props.showSearch,
        options: options,
        multiple: multiple,
        disabled: disabled,
        visible: open,
        inputValue: state.inputValue,
        value: state.value,
        onDropdownVisibleChange: this.onDropdownVisibleChange,
        getPopupContainer: props.getPopupContainer,
        onMenuSelect: this.onMenuSelect,
        onMenuDeselect: this.onMenuDeselect,
        ref: 'trigger'
      },
      _react2["default"].createElement(
        'div',
        {
          style: props.style,
          ref: 'root',
          onBlur: this.onOuterBlur,
          onFocus: this.onOuterFocus,
          className: (0, _classnames3["default"])(rootCls)
        },
        _react2["default"].createElement(
          'div',
          (0, _extends3["default"])({
            ref: 'selection',
            key: 'selection',
            className: prefixCls + '-selection\n            ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
            role: 'combobox',
            'aria-autocomplete': 'list',
            'aria-haspopup': 'true',
            'aria-expanded': open
          }, extraSelectionProps),
          ctrlNode,
          allowClear && !multiple ? clear : null,
          multiple || !props.showArrow ? null : _react2["default"].createElement(
            'span',
            (0, _extends3["default"])({
              key: 'arrow',
              className: prefixCls + '-arrow',
              style: _util.UNSELECTABLE_STYLE
            }, _util.UNSELECTABLE_ATTRIBUTE, {
              onClick: this.onArrowClick
            }),
            _react2["default"].createElement('b', null)
          )
        )
      )
    );
  }
});

exports["default"] = Select;
module.exports = exports['default'];