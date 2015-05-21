const ClassNameMixin = {
  componentWillMount() {
    this.className = this.props.classPrefix + '-' + this.props.tailClassName;
  }
} 

export {ClassNameMixin};