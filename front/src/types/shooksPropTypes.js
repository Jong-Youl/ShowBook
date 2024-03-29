import PropTypes from 'prop-types';

export const shookDataPropTypes = {
  shortsJson: PropTypes.arrayOf(
    PropTypes.shape({
      book_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      memberImageUrl: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      shook_id: PropTypes.number.isRequired,
      shookImageUrl: PropTypes.string.isRequired,
      like_status: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
