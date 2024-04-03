import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import ReviewService from '../../../api/ReviewService';
import { Container } from './MyReview.styles';
import ReviewCard from './ReviewCard';

const fetchMyReviews = async ({ pageParam = 0 }) => {
  const response = await ReviewService.getMyReviews({
    page: pageParam,
    size: 10,
  });
  console.log(response.data);
  return response.data;
};

const MyReview = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'myReviews',
    fetchMyReviews,
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.number + 1;
        return lastPage.totalPages === 0 ? undefined : nextPage;
      },
    },
  );

  // Container 컴포넌트를 참조하기 위한 ref 생성
  const containerRef = useRef(null);

  // Container의 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // containerRef.current가 null이 아니라면 스크롤 위치 계산
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight + 5 >= scrollHeight) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <Container ref={containerRef}>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.content.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      ))}
      {hasNextPage && <div></div>}
      <div>모든 리뷰를 불러왔습니다.</div>
    </Container>
  );
};

export default MyReview;
