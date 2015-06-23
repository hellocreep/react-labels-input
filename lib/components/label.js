import React from 'react';
import {ClassNameMixin} from './mixins';

const Label = React.createClass({
  mixins: [ClassNameMixin],
  getDefaultProps() {
    return {
      tailClassName: 'label-item'
    }
  },
  remove() {
    let text = this.refs.label.getDOMNode().textContent.trim();
    this.props.remove(text);
  },
  render() {
    let props = this.props;
    return (
      <span className={this.className}><span ref="label">{props.text}</span><a href="#" onClick={this.remove}></a></span>
    );
  }
});

const LabelList = React.createClass({
  mixins: [ClassNameMixin],
  getDefaultProps() {
    return {
      tailClassName: 'label-list'
    }
  },
  render() {
    let props = this.props;
    let labelNodes = props.labels.map((label, index) => {
      return <Label key={index} text={label} remove={props.remove} classPrefix={props.classPrefix} />;
    });
    return (
      <span className={this.className}>
        {labelNodes}
      </span>
    );
  }
});

export default LabelList;