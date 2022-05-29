import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
function ImageGalleryItem({ name, image }) {
  return (
    <li className={s.imageGalleryItem}>
      <img className={s.imageGallery} src={image} alt={name} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
};
export default ImageGalleryItem;
