import React from 'react';
import {ClassNameMixin} from './mixins';

const Item = React.createClass({
  mixins: [ClassNameMixin],
  getDefaultProps() {
    return {
      tailClassName: 'typeahead-list__item'
    }
  },
  add() {
    let value = this.refs.item.getDOMNode().textContent.trim();
    this.props.add(value);
  },
  render() {
    var style = {};
    if(this.props.active) {
      this.className = this.className + '--active';
    } else {
      this.className = this.className.replace('--active', '');
    }
    return (
      <li ref="item" className={this.className} onClick={this.add}>{this.props.children}</li>
    );
  }
});

const ItemList = React.createClass({
  mixins: [ClassNameMixin],
  getDefaultProps() {
    return {
      tailClassName: 'typeahead-list'
    }
  },
  getInitialState() {
    return {
      currentIndex: -1
    }
  },
  componentDidMount() {
    this.props.typeaheadEmitter.on('down', () => {
      if(this.state.currentIndex >= (this.props.typeaheadData.length - 1)) return;
      let index = this.state.currentIndex + 1;
      this._keyMove(index);
    });
    this.props.typeaheadEmitter.on('up', () => {
      if(this.state.currentIndex < 1) return;
      let index = this.state.currentIndex - 1;
      this._keyMove(index);
    }); 
    this.props.typeaheadEmitter.on('clear', () => {
      this.setState({
        currentIndex: -1
      });
    });
  },
  _keyMove(index) {
    this.setState({
      currentIndex: index
    });
    this.props.setCurrentInput(this.props.typeaheadData[index]);
  },
  render() {
    let ItemNodes = this.props.typeaheadData.map((item, index)=> {
      let active;
      if(index === this.state.currentIndex) {
        active = true;
      } 
      return <Item key={index} active={active} classPrefix={this.props.classPrefix} add={this.props.add}>{item}</Item>
    });
    return (
      <ul className={this.className}>{ItemNodes}</ul>
    );
  }
});

export default ItemList;