import PropTypes from 'prop-types';

export const readBookCategoryDataPropTypes = {
  bookData: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
