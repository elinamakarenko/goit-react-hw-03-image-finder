import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
function ImageGalleryItem({ name, image }) {
  return (
    <li className={s.imageGalleryItem}>
      <img className={s.imageGallery} src={image} alt={name} />
    </li>
  );
}

export default ImageGalleryItem;
