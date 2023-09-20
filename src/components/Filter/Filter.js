import React from 'react';

const Filter = ({ value, onChange }) => (
  <div>
    <div>Find contacts by name</div>
    <input type="text" value={value} onChange={onChange} placeholder="search" />
  </div>
);

export default Filter;
