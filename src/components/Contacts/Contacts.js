import React from 'react';
import { List, Item, Button } from './ContactsStyled';

const ContactList = ({ onFilter, onDelete }) => {
  return (
    <List>
      {onFilter.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <span>{name}:</span>
            <span>{number}:</span>

            <Button type="button" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </Item>
        );
      })}
    </List>
  );
};

export default ContactList;
