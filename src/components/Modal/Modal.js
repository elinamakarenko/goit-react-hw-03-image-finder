import PropTypes from 'prop-types';
import s from './Modal.module.css';
function Modal({ name, largeImageURL }) {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <img src={largeImageURL} alt={name} />
      </div>
    </div>
  );
}

export default Modal;
