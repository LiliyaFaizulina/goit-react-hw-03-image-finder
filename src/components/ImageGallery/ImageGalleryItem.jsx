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

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const { img, alt, largeImg } = this.props;
    const {
      state: { isModalOpen },
      openModal,
      closeModal,
    } = this;
    return (
      <GalleryItem>
        <Image src={img} alt={alt} onClick={openModal} />
        {isModalOpen && (
          <Modal url={largeImg} alt={alt} closeModal={closeModal} />
        )}
      </GalleryItem>
    );
  }
}
