import PropTypes from 'prop-types';

export const readBookMonthlyDataPropTypes = {
  readMonthlyJson: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
