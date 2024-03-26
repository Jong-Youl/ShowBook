import PropTypes from 'prop-types';

export const readBookMonthlyDataPropTypes = {
  bookData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
