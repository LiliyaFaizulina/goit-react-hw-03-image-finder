import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ id, ...otherProps }) => (
        <ImageGalleryItem key={id} {...otherProps} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
