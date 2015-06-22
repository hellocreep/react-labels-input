import React from 'react';
import LabelsInput from '../src/index';

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