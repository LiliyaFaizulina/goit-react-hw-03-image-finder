export const mapper = images =>
  images.map(({ id, webformatURL, largeImageURL, tags }) => ({
    id,
    img: webformatURL,
    largeImg: largeImageURL,
    alt: tags,
  }));
