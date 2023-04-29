import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ openModal, arrayImages }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem openModal={openModal} arrayImages={arrayImages} />
    </ul>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  arrayImages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
