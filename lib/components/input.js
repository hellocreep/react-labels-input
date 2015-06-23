import React from 'react';
import {ClassNameMixin} from './mixins';

const Input = React.createClass({
  mixins: [ClassNameMixin],
  getDefaultProps() {
    return {
      tailClassName: 'label-input'
    }
  },
  _onChange(e) {
    this.props.change(e.target.value);
  },
  _keyDown(e) {
    let value = this.refs.input.getDOMNode().value.trim();
    let props = this.props;
    switch(e.keyCode) {
      case 13:
        props.addLabel(value);
        break;
      case 8:
        if(!value) {
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
  componentDidMount() {
    let dom = this.refs.input.getDOMNode();
    this.props.inputEmitter.on('clear', function() {
      dom.value = '';
    });
    this.props.inputEmitter.on('focus', function() {
      dom.focus();
    });
  },
  render() {
    return (
      <input
        ref="input"
        onChange={this._onChange}
        onKeyDown={this._keyDown}
        value={this.props.currentInput}
        type="text"
        className={this.className}
      />
    )
  }
});

export default Input;