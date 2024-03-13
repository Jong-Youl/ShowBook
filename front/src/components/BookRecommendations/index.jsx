import React from 'react';
import PropTypes from 'prop-types';

const BookRecommendations = ({ booksJson }) => {
  const booksListWithMap = booksJson.map((book, index) => (
    <div key={index}>
      <div>{book.title}</div>
      <div>{book.author}</div>
      <div>{book.total_page}</div>
    </div>
  ));

  return (
    <div>
      <h2>Book Recommendations</h2>
      <div>{booksListWithMap}</div>
    </div>
  );
};

// propTypes를 사용하여 booksJson prop의 타입을 명시
BookRecommendations.propTypes = {
  booksJson: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      total_page: PropTypes.number.isRequired,
      // ...
    }),
  ).isRequired,
};
export default BookRecommendations;
