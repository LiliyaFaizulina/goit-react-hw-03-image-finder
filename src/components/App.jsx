import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { mapper } from 'utils/mapper';
import { fetchApi } from 'utils/fetchApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';

const errorMessage = `Nothing found for your request. Change query and try again`;
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    perPage: 12,
    isLoading: false,
    error: null,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, query, perPage } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.fetchImages(query, page, perPage);
    }
    if (page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.toLowerCase().trim();
    this.setState({ query, page: 1, images: [], totalHits: null, error: null });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchImages = async (query, page, perPage) => {
    try {
      this.setState({ isLoading: true });
      const resp = await fetchApi(query, page, perPage);

      if (!resp.data.hits.length) {
        throw new Error(errorMessage);
      }

      const { hits, totalHits } = resp.data;
      this.setState(prevState => ({
        images: [...prevState.images, ...mapper(hits)],
        totalHits,
      }));
    } catch {
      this.setState({ error: errorMessage });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  countTotalPages = () => {
    const { totalHits, perPage } = this.state;
    return Math.round(totalHits / perPage);
  };

  render() {
    const { onSubmit, loadMore, countTotalPages } = this;
    const { images, isLoading, error, totalHits, page, perPage } = this.state;
    return (
      <>
        <SearchBar onSubmit={onSubmit} />
        <ImageGallery images={images} />
        {error && <Notification message={error} />}
        {isLoading && <Loader />}
        {!isLoading && totalHits > perPage && page < countTotalPages() && (
          <Button loadMore={loadMore} />
        )}
      </>
    );
  }
}
