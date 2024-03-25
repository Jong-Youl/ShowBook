import PropTypes from 'prop-types';

export const bookDataPropTypes = {
  bookData: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
