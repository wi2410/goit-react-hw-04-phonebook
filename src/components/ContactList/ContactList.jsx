import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <ContactItem
            key={contact.id}
            value={contact}
            onDeleteContact={() => onDeleteContact(contact.id)}
          />
        );
      })}
    </ul>
  );
};
export default ContactList;

ContactList.propTypes = {
  ccontacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
}