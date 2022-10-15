import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchInput,
  SearchIcon,
} from './Searchbar.styled.jsx';

export const SearchBar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchBtn type="submit">
          <SearchIcon />
        </SearchBtn>

        <SearchInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
