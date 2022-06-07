import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import fetchPixabay from 'services/fetchPixabay';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    showModal: false,
    imageModal: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchValue;
    const nextName = this.props.searchValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (nextName !== prevName) {
      this.setState({ images: [], page: 1 });
    }
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      fetchPixabay(nextName, nextPage)
        .then(image => {
          if (image.hits.length) {
            this.setState(prevState => {
              const { images } = prevState;
              return {
                images: [...images, ...image.hits],
                status: Status.RESOLVED,
              };
            });
          } else {
            return Promise.reject(new Error(`Нет картинок ${nextName}`));
          }
        })
        .catch(error => {
          toast.error(error.message);
          this.setState({ error, status: Status.REJECTED });
        });
    }
  }

  loadMoreClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  showModal = event => {
    const { images } = this.state;
    this.setState({
      imageModal: images.find(img => img.webformatURL === event.target.src),
    });
    this.toggleModal();
  };

  render() {
    const { images, imageModal, showModal, status } = this.state;
    return (
      <>
        <ul className={s.imageGallery}>
          {images.map(({ id, tags, webformatURL }) => (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              name={tags}
              onClick={this.showModal}
            />
          ))}
        </ul>
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <Button onClick={this.loadMoreClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imageModal.largeImageURL} alt={imageModal.tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};
export default ImageGallery;
