import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  static propTypes = {
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { img, alt, largeImg } = this.props;
    const {
      state: { isModalOpen },
      toggleModal,
    } = this;
    return (
      <GalleryItem>
        <Image src={img} alt={alt} onClick={toggleModal} />
        {isModalOpen && (
          <Modal url={largeImg} alt={alt} closeModal={toggleModal} />
        )}
      </GalleryItem>
    );
  }
}
