import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { mapper } from 'utils/mapper';
import { fetchApi } from 'utils/fetchApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';
import { Modal } from './Modal/Modal';

const errorMessage = `Nothing found for your request. Change query and try again`;
const perPage = 12;
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    url: null,
    alt: null,
    totalHits: null,
  };

  onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.toLowerCase();
    this.setState({ query, page: 1, images: [], error: null });
  };

  onImageClick = (url, alt) => {
    this.setState({ url, alt });
  };

  closeModal = () => {
    this.setState({ url: null, alt: null });
  };

  async componentDidUpdate(_, prevState) {
    const { page, query, images } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.fetchImages(query, page, images);
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchImages = async (query, page, images) => {
    try {
      this.setState({ isLoading: true });
      const response = await fetchApi(query, page).then(resp => resp.data);
      if (!response.hits.length) {
        throw new Error(errorMessage);
      }
      this.setState({
        images: [...images, ...mapper(response.hits)],
        totalHits: response.totalHits,
      });
    } catch {
      this.setState({ error: errorMessage });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { onSubmit, loadMore, onImageClick, closeModal } = this;
    const { images, isLoading, error, url, alt, totalHits, page } = this.state;
    const totalPages = Math.round(totalHits / perPage);
    return (
      <>
        <SearchBar onSubmit={onSubmit} />
        <ImageGallery images={images} onImageClick={onImageClick} />
        {error && <Notification message={error} />}
        {isLoading && <Loader />}
        {images.length > 0 &&
          !isLoading &&
          totalHits > perPage &&
          page < totalPages && <Button loadMore={loadMore} />}
        {url && <Modal url={url} alt={alt} closeModal={closeModal} />}
      </>
    );
  }
}
