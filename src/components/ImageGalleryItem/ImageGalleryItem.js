import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
function ImageGalleryItem({ name, image, onClick }) {
  return (
    <li className={s.imageGalleryItem}>
      <img
        className={s.imageGallery}
        src={image}
        alt={name}
        onClick={onClick}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};
export default ImageGalleryItem;
