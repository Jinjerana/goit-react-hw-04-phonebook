import { useState, useEffect } from 'react';

import Forma from './Form';
import ContactList from './Contacts/Contacts';
import Filter from './Filter';

export default function App() {
  // props for contacts
const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? '')
  // props for filter
  const [filter, setFilter] = useState(true);


// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

useEffect(() => {
  window.localStorage.setItem('contacts', JSON.parse(contacts))
}, [contacts]);




  // componentDidMount = () => {
  //   const savedContacts = localStorage.getItem('contacts');
  //   if (!savedContacts) return;
  //   this.setState({ contacts: JSON.parse(savedContacts) });
  // };

  componentDidUpdate = (prevProps, prevState) => {
    console.log('update');
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  addContact = newContact => {
    const isSameContact = this.state.contacts.some(
      ({ name, number }) =>
        name.toLowerCase() === newContact.name.toLowerCase() ||
        number === newContact.number
    );

    if (isSameContact) {
      alert(`${newContact.name}: is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };

  changeFilter = e => {
    setFilter(e.currentTarget.value.toLowerCase());
    // this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  getVisibleContacts = () => {
    // const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <Forma onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList onFilter={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
