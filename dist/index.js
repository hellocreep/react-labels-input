(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("fuzzy"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "fuzzy"], factory);
	else if(typeof exports === 'object')
		exports["LabelsInput"] = factory(require("react"), require("fuzzy"));
	else
		root["LabelsInput"] = factory(root["react"], root["fuzzy"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _events = __webpack_require__(4);

	var _fuzzy = __webpack_require__(5);

	var _fuzzy2 = _interopRequireDefault(_fuzzy);

	var _componentsInput = __webpack_require__(6);

	var _componentsInput2 = _interopRequireDefault(_componentsInput);

	var _componentsLabel = __webpack_require__(1);

	var _componentsLabel2 = _interopRequireDefault(_componentsLabel);

	var _componentsTypeahead = __webpack_require__(7);

	var _componentsTypeahead2 = _interopRequireDefault(_componentsTypeahead);

	var _componentsMixins = __webpack_require__(3);

	__webpack_require__(8);

	var inputEmitter = new _events.EventEmitter();
	var typeaheadEmitter = new _events.EventEmitter();
	var PropTypes = _react2['default'].PropTypes;
	function noop() {};

	var LabelsInput = _react2['default'].createClass({
	  displayName: 'LabelsInput',

	  mixins: [_componentsMixins.ClassNameMixin],
	  propTypes: {
	    labels: PropTypes.array,
	    add: PropTypes.func,
	    remove: PropTypes.func,
	    data: PropTypes.array,
	    classPrefix: PropTypes.string
	  },
	  getInitialState: function getInitialState() {
	    return {
	      currentInput: '',
	      typeaheadData: []
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      labels: [],
	      data: [],
	      classPrefix: 'react',
	      tailClassName: 'wrap',
	      add: noop,
	      remove: noop
	    };
	  },
	  handleChange: function handleChange(value) {
	    this.setCurrentInput(value);
	    var props = this.props;
	    var state = this.state;
	    var typeaheadData = [];
	    var filterData = props.data.filter(function (item) {
	      return props.labels.indexOf(item) == -1;
	    });
	    filterData.forEach(function (label) {
	      if (value && _fuzzy2['default'].test(value, label)) {
	        typeaheadData.push(label);
	      }
	    });
	    if (!typeaheadData.length) {
	      typeaheadData = [];
	    }
	    this.setState({
	      typeaheadData: typeaheadData
	    });
	  },
	  addLabel: function addLabel(value) {
	    if (this.props.labels.indexOf(value) !== -1 || !value) return;
	    var labels = this.props.labels;
	    labels.push(value);
	    this.setProps({
	      labels: labels
	    });
	    this.setCurrentInput('');
	    inputEmitter.emit('clear');
	    typeaheadEmitter.emit('clear');
	    this.props.add && this.props.add(value, this.props.labels);
	  },
	  setCurrentInput: function setCurrentInput(value) {
	    this.setState({
	      currentInput: value
	    });
	  },
	  removeLabel: function removeLabel(value) {
	    var labels = this.props.labels;
	    if (labels.indexOf(value) !== -1) {
	      var index = labels.indexOf(value);
	      labels.splice(index, 1);
	    }
	    this.setProps({
	      labels: labels
	    });
	    this.props.remove && this.props.remove(value, this.props.labels);
	  },
	  editLast: function editLast() {
	    var value = this.props.labels[this.props.labels.length - 1];
	    this.handleChange(value);
	    this.removeLabel(value);
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    this.setProps({
	      data: this.props.data
	    });
	    inputEmitter.on('clear', function () {
	      _this.setState({
	        typeaheadData: []
	      });
	    });
	  },
	  handleMoveUp: function handleMoveUp() {
	    typeaheadEmitter.emit('up');
	  },
	  handleMoveDown: function handleMoveDown() {
	    typeaheadEmitter.emit('down');
	  },
	  handleFoucs: function handleFoucs() {
	    inputEmitter.emit('focus');
	  },
	  render: function render() {
	    var props = this.props;
	    var state = this.state;
	    return _react2['default'].createElement(
	      'div',
	      { className: this.className, onClick: this.handleFoucs },
	      _react2['default'].createElement(_componentsLabel2['default'], {
	        labels: props.labels,
	        remove: this.removeLabel,
	        classPrefix: props.classPrefix }),
	      _react2['default'].createElement(
	        'span',
	        { className: props.classPrefix + '-input-wrap' },
	        _react2['default'].createElement(_componentsInput2['default'], {
	          classPrefix: props.classPrefix,
	          currentInput: state.currentInput,
	          addLabel: this.addLabel,
	          change: this.handleChange,
	          moveUp: this.handleMoveUp,
	          moveDown: this.handleMoveDown,
	          editLast: this.editLast,
	          inputEmitter: inputEmitter
	        }),
	        _react2['default'].createElement(_componentsTypeahead2['default'], {
	          classPrefix: props.classPrefix,
	          typeaheadEmitter: typeaheadEmitter,
	          typeaheadData: state.typeaheadData,
	          setCurrentInput: this.setCurrentInput,
	          add: this.addLabel
	        })
	      )
	    );
	  }
	});

	exports['default'] = LabelsInput;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _mixins = __webpack_require__(3);

	var Label = _react2['default'].createClass({
	  displayName: 'Label',

	  mixins: [_mixins.ClassNameMixin],
	  getDefaultProps: function getDefaultProps() {
	    return {
	      tailClassName: 'label-item'
	    };
	  },
	  remove: function remove() {
	    var text = this.refs.label.getDOMNode().textContent.trim();
	    this.props.remove(text);
	  },
	  render: function render() {
	    var props = this.props;
	    return _react2['default'].createElement(
	      'span',
	      { className: this.className },
	      _react2['default'].createElement(
	        'span',
	        { ref: 'label' },
	        props.text
	      ),
	      _react2['default'].createElement('a', { href: '#', onClick: this.remove })
	    );
	  }
	});

	var LabelList = _react2['default'].createClass({
	  displayName: 'LabelList',

	  mixins: [_mixins.ClassNameMixin],
	  getDefaultProps: function getDefaultProps() {
	    return {
	      tailClassName: 'label-list'
	    };
	  },
	  render: function render() {
	    var props = this.props;
	    var labelNodes = props.labels.map(function (label, index) {
	      return _react2['default'].createElement(Label, { key: index, text: label, remove: props.remove, classPrefix: props.classPrefix });
	    });
	    return _react2['default'].createElement(
	      'span',
	      { className: this.className },
	      labelNodes
	    );
	  }
	});

	exports['default'] = LabelList;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ClassNameMixin = {
	  componentWillMount: function componentWillMount() {
	    this.className = this.props.classPrefix + '-' + this.props.tailClassName;
	  }
	};

	exports.ClassNameMixin = ClassNameMixin;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _mixins = __webpack_require__(3);

	var Input = _react2['default'].createClass({
	  displayName: 'Input',

	  mixins: [_mixins.ClassNameMixin],
	  getDefaultProps: function getDefaultProps() {
	    return {
	      tailClassName: 'label-input'
	    };
	  },
	  _onChange: function _onChange(e) {
	    this.props.change(e.target.value);
	  },
	  _keyDown: function _keyDown(e) {
	    var value = this.refs.input.getDOMNode().value.trim();
	    var props = this.props;
	    switch (e.keyCode) {
	      case 13:
	        props.addLabel(value);
	        break;
	      case 8:
	        if (!value) {
	          e.preventDefault();
	          props.editLast();
	        }
	        break;
	      case 40:
	        props.moveDown();
	        break;
	      case 38:
	        props.moveUp();
	        break;
	      default:
	        break;
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    var dom = this.refs.input.getDOMNode();
	    this.props.inputEmitter.on('clear', function () {
	      dom.value = '';
	    });
	    this.props.inputEmitter.on('focus', function () {
	      dom.focus();
	    });
	  },
	  render: function render() {
	    return _react2['default'].createElement('input', {
	      ref: 'input',
	      onChange: this._onChange,
	      onKeyDown: this._keyDown,
	      value: this.props.currentInput,
	      type: 'text',
	      className: this.className
	    });
	  }
	});

	exports['default'] = Input;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _mixins = __webpack_require__(3);

	var Item = _react2['default'].createClass({
	  displayName: 'Item',

	  mixins: [_mixins.ClassNameMixin],
	  getDefaultProps: function getDefaultProps() {
	    return {
	      tailClassName: 'typeahead-list__item'
	    };
	  },
	  add: function add() {
	    var value = this.refs.item.getDOMNode().textContent.trim();
	    this.props.add(value);
	  },
	  render: function render() {
	    var style = {};
	    if (this.props.active) {
	      this.className = this.className + '--active';
	    } else {
	      this.className = this.className.replace('--active', '');
	    }
	    return _react2['default'].createElement(
	      'li',
	      { ref: 'item', className: this.className, onClick: this.add },
	      this.props.children
	    );
	  }
	});

	var ItemList = _react2['default'].createClass({
	  displayName: 'ItemList',

	  mixins: [_mixins.ClassNameMixin],
	  getDefaultProps: function getDefaultProps() {
	    return {
	      tailClassName: 'typeahead-list'
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      currentIndex: -1
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    this.props.typeaheadEmitter.on('down', function () {
	      if (_this.state.currentIndex >= _this.props.typeaheadData.length - 1) return;
	      var index = _this.state.currentIndex + 1;
	      _this._keyMove(index);
	    });
	    this.props.typeaheadEmitter.on('up', function () {
	      if (_this.state.currentIndex < 1) return;
	      var index = _this.state.currentIndex - 1;
	      _this._keyMove(index);
	    });
	    this.props.typeaheadEmitter.on('clear', function () {
	      _this.setState({
	        currentIndex: -1
	      });
	    });
	  },
	  _keyMove: function _keyMove(index) {
	    this.setState({
	      currentIndex: index
	    });
	    this.props.setCurrentInput(this.props.typeaheadData[index]);
	  },
	  render: function render() {
	    var _this2 = this;

	    var ItemNodes = this.props.typeaheadData.map(function (item, index) {
	      var active = undefined;
	      if (index === _this2.state.currentIndex) {
	        active = true;
	      }
	      return _react2['default'].createElement(
	        Item,
	        { key: index, active: active, classPrefix: _this2.props.classPrefix, add: _this2.props.add },
	        item
	      );
	    });
	    return _react2['default'].createElement(
	      'ul',
	      { className: this.className },
	      ItemNodes
	    );
	  }
	});

	exports['default'] = ItemList;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;