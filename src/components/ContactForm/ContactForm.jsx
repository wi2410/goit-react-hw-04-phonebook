// import React, { Component } from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, SubmitButton, FormInput } from './ContactForm.styled';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(6),
      name,
      number,
    };

    onSubmit(contact);
    setName('');
    setNumber('')
  };

  

  
    return (
      <Form onSubmit={handleSubmit}>
        <label>
          Name
          <br />
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            autocomplete="off"
          />
        </label>

        <label>
          Number
          <br />
          <FormInput
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <SubmitButton type="submit">Add contact</SubmitButton>
      </Form>
    );
  
}