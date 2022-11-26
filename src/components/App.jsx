import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
// import defaultContacts from './contacts';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmitInfo = data => {
    const findContact = this.state.contacts.find(el => el.name === data.name);
    if (findContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState({
      contacts: this.state.contacts.concat([data])
    })
  };

  handleSearch = data => {
    this.setState({
      filter: data,
    });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmitInfo} />
        <h2>Contacts</h2>
        <Filter onFilter={this.handleSearch} />
        <ContactList
          contacts={this.filterContacts()}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
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
