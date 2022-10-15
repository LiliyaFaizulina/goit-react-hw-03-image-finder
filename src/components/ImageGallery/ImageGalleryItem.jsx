import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGallery.styled';

export const ImageGalleryItem = ({ img, alt, largeImg, onImageClick }) => {
  return (
    <GalleryItem onClick={() => onImageClick(largeImg, alt)}>
      <Image src={img} alt={alt} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
