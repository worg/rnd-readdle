import React, { Component } from 'react';
import './form.css';

const defaultData = {
  title: '',
  body: '',
  author: '',
  category: '',
};

export default class Form extends Component {
  constructor(props) {
    super(props);
    this._values = Object.assign({}, defaultData, props.modal.data);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    console.warn('TARGET:', target);
  };

  render() {
    const { modal, categories } = this.props;
    const values = this._values;
    return (
      <form
        action='#'
        className='post-form'
        onSubmit={this.onSubmit} >
        <h4>{modal.action === 'ADD' ? 'Add' : 'Edit'} Post</h4>
        <input
          type='text'
          name='title'
          defaultValue={values.title}
          placeholder='Title' />
        <textarea
          name='body'
          defaultValue={values.body}
          placeholder='Content' />
        <label htmlFor='categories'>
          Category: 
          <select
            name='categories'
            defaultValue={values.category}>
            <option value='' disabled>Select one</option>
            {Object.values(categories).map(c => (
              <option
                key={c.name}
                value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <input type='submit' value='Save' />
      </form>
    );
  }
}
