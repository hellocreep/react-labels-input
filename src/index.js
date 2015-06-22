import React from 'react';
import {EventEmitter} from 'events';
import fuzzy from 'fuzzy';

import Input from './components/input';
import LabelList from './components/label';
import TypeAhead from './components/typeahead';
import {ClassNameMixin} from './components/mixins';

import '../scss/labelsinput.scss';


var inputEmitter = new EventEmitter();
var typeaheadEmitter = new EventEmitter();
var PropTypes = React.PropTypes;
function noop() {};

const LabelsInput = React.createClass({
  mixins: [ClassNameMixin],
  propTypes: {
    labels: PropTypes.array,
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
      labels: [],
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
      return props.labels.indexOf(item) == -1;
    });
    filterData.forEach((label)=> {
      if(value && fuzzy.test(value, label)) {
        typeaheadData.push(label);
      }
    });
    if(!typeaheadData.length) {
      typeaheadData = [];
    }
    this.setState({
      typeaheadData: typeaheadData
    });
  },
  addLabel(value) {
    if(this.props.labels.indexOf(value) !== -1 || !value) return;
    let labels = this.props.labels;
    labels.push(value);
    this.setProps({
      labels: labels
    });
    this.setCurrentInput('');
    inputEmitter.emit('clear');
    typeaheadEmitter.emit('clear');
    this.props.add && this.props.add(value, this.props.labels);
  },
  setCurrentInput(value) {
    this.setState({
      currentInput: value
    });
  },
  removeLabel(value) {
    var labels = this.props.labels;
    if(labels.indexOf(value) !== -1) {
      let index = labels.indexOf(value);
      labels.splice(index, 1);
    }
    this.setProps({
      labels: labels
    });
    this.props.remove && this.props.remove(value, this.props.labels);
  },
  editLast() {
    let value = this.props.labels[this.props.labels.length - 1];
    this.handleChange(value);
    this.removeLabel(value);
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
  handleFoucs() {
    inputEmitter.emit('focus');
  },
  render() {
    var props = this.props;
    var state = this.state;
    return (
      <div className={this.className} onClick={this.handleFoucs}>
        <LabelList
          labels={props.labels}
          remove={this.removeLabel}
          classPrefix={props.classPrefix} />
        <span className={props.classPrefix + '-input-wrap'}>
          <Input
            classPrefix={props.classPrefix}
            currentInput={state.currentInput}
            addLabel={this.addLabel}
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
            add={this.addLabel}
          />
        </span>
      </div>
    );
  }
});

export default LabelsInput;