import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import fetchPixabay from 'services/fetchPixabay';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
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
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  loadMoreClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return toast.error(error.message);
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.imageGallery}>
            {images.map(({ id, tags, webformatURL }) => (
              <ImageGalleryItem key={id} image={webformatURL} name={tags} />
            ))}
          </ul>
          <Button onClick={this.loadMoreClick} />
        </>
      );
    }
  }
}
ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};
export default ImageGallery;
