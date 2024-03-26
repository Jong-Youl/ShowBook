import PropTypes from 'prop-types';

export const readBookCategoryDataPropTypes = {
  readCategoryJson: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
