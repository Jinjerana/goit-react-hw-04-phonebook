import { useState, useEffect } from 'react';

import Forma from './Form';
import ContactList from './Contacts/Contacts';
import Filter from './Filter';

export function App() {
  // props for contacts
  // const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [contacts, setContacts] = useState(
    JSON.stringify(window.localStorage.getItem('contacts')) ?? ''
  );
  // props for filter
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.parse(contacts));
  }, [contacts]);

  // componentDidMount = () => {
  //   const savedContacts = localStorage.getItem('contacts');
  //   if (!savedContacts) return;
  //   this.setState({ contacts: JSON.parse(savedContacts) });
  // };

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log('update');
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const addContact = newContact => {
    const isSameContact = contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === newContact.name.toLowerCase() ||
        number === newContact.number
    );

    if (isSameContact) {
      alert(`${newContact.name}: is already in contacts`);
      return;
    }

    setContacts(contacts => [...newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const getVisibleContacts = () => {
    contacts.filter(contact => contact.name.toLowerCase().includes(filter));
  };
  // render() {
  //   const filter = this.state;
  //   const visibleContacts = this.getVisibleContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <Forma onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList onFilter={getVisibleContacts()} onDelete={deleteContact} />
    </div>
  );
}
