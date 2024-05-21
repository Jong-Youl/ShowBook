import PropTypes from 'prop-types';

export const bookDataPropTypes = {
  booksJson: PropTypes.arrayOf(
    PropTypes.shape({
      // book_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      book_image_url: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      total_page: PropTypes.number.isRequired,
      publisher: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
