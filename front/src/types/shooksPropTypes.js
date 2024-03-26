import PropTypes from 'prop-types';

export const shookDataPropTypes = {
  shortsJson: PropTypes.arrayOf(
    PropTypes.shape({
      book_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      member_img_url: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      shook_id: PropTypes.number.isRequired,
      shook_img_url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
