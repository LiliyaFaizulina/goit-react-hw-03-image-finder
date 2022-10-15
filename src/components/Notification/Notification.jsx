import PropTypes from 'prop-types';
import { BsEmojiFrown } from 'react-icons/bs';
import { ErrorMessage } from './Notification.styled';

export const Notification = ({ message }) => (
  <ErrorMessage>
    <BsEmojiFrown />
    {message}
  </ErrorMessage>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
