# react-labels-input
react labels input

## Installation

`npm install react-labels-input --save`

## Usage

```js
import React from 'react';
import LabelsInput from 'react-labels-input';

var data = ['apple', 'banana', 'cheery'];

function add(value, tags) {
  console.log('add', value);
  console.log('tags', tags);
}

function remove(value, tags) {
  console.log('remove', value);
  console.log('tags', tags);
}

React.render(
  <LabelsInput data={data} add={add} remove={remove} />,
  document.getElementById('app')
);
```

## Props

```js
LabelsInput.propTypes = {
  labels: PropTypes.array,
  add: PropTypes.func,
  remove: PropTypes.func,
  data: PropTypes.array,
  classPrefix: PropTypes.string
}
```

* `labels`: default labels in input
* `data`: typeahead data
* `add`: trigger when added a label
* `remove`: trigger when removed a label
* `classPrefix`: className prefix

## Development

`gulp dev`

## Build

`gulp build`

