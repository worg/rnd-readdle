import React, { Component } from 'react';
import serialize from 'form-serialize';
import uuid from 'uuid/v1';

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
    const { modal: { action } } = this.props;
    const method = action === 'ADD' ? 'onAdd' : 'onEdit';
    // build the post form data
    const formData = Object.assign({
      id: uuid().replace(/-/g, ''),
      timestamp: Date.now(),
    }, serialize(target, { hash: true }));

    const apiCall = this.props[method];
    if (typeof apiCall !== 'function') {
      return;
    }

    apiCall(formData).then(this.props.closeModal);
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
          required
          type='text'
          name='title'
          defaultValue={values.title}
          placeholder='Title' />
        <textarea
          required
          name='body'
          defaultValue={values.body}
          placeholder='Content' />
        <label htmlFor='category'>
          Category: 
          <select
            required
            name='category'
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
        <input type='hidden' name='id' defaultValue={values.id} />
        <input type='submit' value='Save' />
      </form>
    );
  }
}
