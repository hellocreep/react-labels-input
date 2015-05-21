import React from 'react';
import {EventEmitter} from 'events';
import fuzzy from 'fuzzy';

import Input from './components/input';
import TagList from './components/tag';
import TypeAhead from './components/typeahead';
import {ClassNameMixin} from './components/mixins';

var inputEmitter = new EventEmitter();
var typeaheadEmitter = new EventEmitter();
var PropTypes = React.PropTypes;
function noop() {};

const TagsInput = React.createClass({
  mixins: [ClassNameMixin],
  propTypes: {
    tags: PropTypes.array,
    add: PropTypes.func,
    remove: PropTypes.func,
    data: PropTypes.array,
    classPrefix: PropTypes.string
  },
  getInitialState() {
    return {
      currentInput: '',
      typeaheadData: []
    }
  },
  getDefaultProps() {
    return {
      tags: [],
      data: [],
      classPrefix: 'react',
      tailClassName: 'wrap',
      add: noop,
      remove: noop
    }
  },
  handleChange(value) {
    this.setCurrentInput(value);
    let props = this.props;
    let state = this.state;
    let typeaheadData = [];
    let filterData = props.data.filter((item)=> {
      return props.tags.indexOf(item) == -1; 
    });
    filterData.forEach((tag)=> {
      if(value && fuzzy.test(value, tag)) {
        typeaheadData.push(tag);
      }
    });
    if(!typeaheadData.length) {
      typeaheadData = [];
    } 
    this.setState({
      typeaheadData: typeaheadData
    });
  },
  addTag(value) {
    if(this.props.tags.indexOf(value) !== -1 || !value) return;
    let tags = this.props.tags;
    tags.push(value);
    this.setProps({
      tags: tags
    });
    this.setCurrentInput('');
    inputEmitter.emit('clear');
    typeaheadEmitter.emit('clear');
    this.props.add && this.props.add(value, this.props.tags);
  },
  setCurrentInput(value) {
    this.setState({
      currentInput: value
    });
  },
  removeTag(value) {
    var tags = this.props.tags;
    if(tags.indexOf(value) !== -1) {
      let index = tags.indexOf(value);
      tags.splice(index, 1);
    }
    this.setProps({
      tags: tags
    }); 
    this.props.remove && this.props.remove(value, this.props.tags);
  },
  editLast() {
    let value = this.props.tags[this.props.tags.length - 1];
    this.handleChange(value);
    this.removeTag(value);
  },
  componentDidMount() {
    this.setProps({
      data: this.props.data
    });
    inputEmitter.on('clear', () => {
      this.setState({
        typeaheadData: []
      })
    })
  },
  handleMoveUp() {
    typeaheadEmitter.emit('up')
  },
  handleMoveDown() {
    typeaheadEmitter.emit('down');
  },
  render() {
    var props = this.props;
    var state = this.state;
    return (
      <div className={this.className}>
        <TagList 
          tags={props.tags} 
          remove={this.removeTag} 
          classPrefix={props.classPrefix} />
        <span className={props.classPrefix + '-input-wrap'}>
          <Input 
            classPrefix={props.classPrefix}
            currentInput={state.currentInput}
            addTag={this.addTag}
            change={this.handleChange} 
            moveUp={this.handleMoveUp}
            moveDown={this.handleMoveDown}
            editLast={this.editLast}
            inputEmitter={inputEmitter} 
          />
          <TypeAhead 
            classPrefix={props.classPrefix}
            typeaheadEmitter={typeaheadEmitter} 
            typeaheadData={state.typeaheadData} 
            setCurrentInput={this.setCurrentInput}
            add={this.addTag} 
          />
        </span>
      </div>
    );
  }
});


var data = ['apple', 'banana', 'cheery', 'angle'];

function add(value, tags) {
  console.log('add', value);
  console.log('tags', tags);
}

function remove(value, tags) {
  console.log('remove', value); 
  console.log('tags', tags);
}
React.render(
  <TagsInput data={data} add={add} remove={remove} />,
  document.getElementById('app')
);