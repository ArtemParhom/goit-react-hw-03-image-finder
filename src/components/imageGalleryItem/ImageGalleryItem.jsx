import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ openModal, arrayImages }) => {
  return (
    <>
      {arrayImages.map(event => (
        <li key={event.id} className={css.ImageGalleryItem}>
          <img
            onClick={() => {
              openModal(event.largeImageURL, event.tags);
            }}
            src={event.webformatURL}
            alt={event.tags}
            className={css.ImageGalleryItemImage}
          />
        </li>
      ))}
    </>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  arrayImages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
