import React from 'react';
import {ClassNameMixin} from './mixins';

const Tag = React.createClass({
  mixins: [ClassNameMixin],
  getDefaultProps() {
    return {
      tailClassName: 'tag-item'
    }
  },
  remove() {
    let text = this.refs.tag.getDOMNode().textContent.trim();
    this.props.remove(text);
  },
  render() {
    let props = this.props;
    return (
      <span className={this.className}><span ref="tag">{props.text}</span><a href="#" onClick={this.remove}></a></span>
    );
  }
});

const TagList = React.createClass({
  mixins: [ClassNameMixin],
  getDefaultProps() {
    return {
      tailClassName: 'tag-list'
    }
  },
  render() {
    let props = this.props;
    let tagNodes = props.tags.map((tag, index) => {
      return <Tag key={index} text={tag} remove={props.remove} classPrefix={props.classPrefix} />;
    });
    return (
      <span className={this.className}>
        {tagNodes}
      </span>
    );
  }
});

export default TagList;