import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { mapper } from 'utils/mapper';
import { fetchApi } from 'utils/fetchApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';

const errorMessage = `Nothing found for your request. Change query and try again`;
const perPage = 12;
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    totalHits: null,
  };

  onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.toLowerCase();
    this.setState({ query, page: 1, images: [], error: null });
  };

  componentDidUpdate(_, prevState) {
    const { page, query, images } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.fetchImages(query, page, images);
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchImages = async (query, page, prevImages) => {
    try {
      this.setState({ isLoading: true });
      const response = await fetchApi(query, page).then(resp => resp.data);
      if (!response.hits.length) {
        throw new Error(errorMessage);
      }
      this.setState({
        images: [...prevImages, ...mapper(response.hits)],
        totalHits: response.totalHits,
      });
    } catch {
      this.setState({ error: errorMessage });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { onSubmit, loadMore } = this;
    const { images, isLoading, error, totalHits, page } = this.state;
    const totalPages = Math.round(totalHits / perPage);
    return (
      <>
        <SearchBar onSubmit={onSubmit} />
        <ImageGallery images={images} />
        {error && <Notification message={error} />}
        {isLoading && <Loader />}
        {images.length > 0 &&
          !isLoading &&
          totalHits > perPage &&
          page < totalPages && <Button loadMore={loadMore} />}
      </>
    );
  }
}
