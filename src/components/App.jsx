// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
// import defaultContacts from './contacts';
import { Container } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const handleSubmitInfo = data => {
    const findContact = contacts.find(el => el.name === data.name);
    if (findContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(() => contacts.concat([data]));
  };

  const handleSearch = data => {
    setFilter(data);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmitInfo} />
        <h2>Contacts</h2>
        <Filter onFilter={handleSearch} />
        <ContactList
          contacts={filterContacts()}
          onDeleteContact={deleteContact}
        />
      </Container>
    );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
