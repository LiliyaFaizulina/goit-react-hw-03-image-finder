import PropTypes from 'prop-types';
import { Backdrop, Wrapper } from './Modal.styled';

export const Modal = ({ url, alt, closeModal }) => {
  return (
    <Backdrop onClick={closeModal}>
      <Wrapper>
        <img src={url} alt={alt} />
      </Wrapper>
    </Backdrop>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
