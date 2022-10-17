import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Backdrop, Wrapper, Image } from './Modal.styled';

export class Modal extends Component {
  state = {
    isLoaded: false,
  };

  static propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.props.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.closeModal);
  }

  setIsLoaded = () => {
    this.setState({ isLoaded: true });
  };

  render() {
    const { url, alt, closeModal } = this.props;
    const { isLoaded } = this.state;
    return (
      <Backdrop onClick={closeModal}>
        <Wrapper>
          <Image
            src={url}
            alt={alt}
            onLoad={this.setIsLoaded}
            loaded={isLoaded}
          />
        </Wrapper>
        {!isLoaded && <Loader />}
      </Backdrop>
    );
  }
}
