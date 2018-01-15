import React from 'react';

const Sorter = ({ changeSort, sortBy }) => (
  <div
    className='sort-items'
    onChange={changeSort}>
    <i className='fa fa-sort-numeric-down sort-icon' />
    <input
      defaultChecked={sortBy === 'timestamp'}
      type='radio'
      name='sort'
      id='sort-none'
      value='timestamp'/>
    <label
      title='sort by date'
      htmlFor='sort-none'>
        <i className='fa fa-clock' />
    </label>
    <input
      defaultChecked={sortBy === 'votes'}
      type='radio'
      name='sort'
      id='sort-votes'
      value='voteScore'/>
    <label
      title='sort by votes'
      htmlFor='sort-votes'>
        <i className='fa fa-heart' />
    </label>
    <input
      defaultChecked={sortBy === 'comments'}
      type='radio'
      name='sort'
      id='sort-comments'
      value='commentCount'/>
    <label
      title='sort by comments'
      htmlFor='sort-comments'>
        <i className='fa fa-comment' />
    </label>
  </div>
);

export default Sorter;