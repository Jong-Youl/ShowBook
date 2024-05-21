import React, { useEffect, useRef, useState } from 'react';
import { reviewsJson } from '../../etc/reviewsJson';


const ReviewScrollList = () => {
    const [reviews, setReviews] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const elementRef = useRef(null);

    const onIntersection = (entries) => {
        const firstEntry = entries[0];
        
        // 첫 번째 entry가 화면에 나타나고 더 많은 데이터를 불러올 수 있는 상태(hasMore)인 경우 fetchMoreItems 함수를 호출.
        if (firstEntry.isIntersecting && hasMore) {
          fetchMoreItems();
        }
      };
    
     // 컴포넌트 렌더링 이후에 실행되며 Intersection Observer를 설정
      useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);
    
     //elementRef가 현재 존재하면 observer로 해당 요소를 관찰.
        if (elementRef.current) {
          observer.observe(elementRef.current);
        }
    
     // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때)반환.
        return () => {
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        };
      }, [hasMore]);

      const fetchMoreItems = async () => {
        console.log(page);
        // 새로운 데이터를 불러올 API 엔드포인트에 요청을 보냅니다.
        // const response = await fetch(
        //   `https://dummyjson.com/products?limit=10&skip=${page * 10}`
        // );
      
        // 응답 데이터를 JSON 형식으로 파싱합니다.
        // const data = await response.json();
        const data = reviewsJson;
        // 만약 더 이상 불러올 상품이 없다면 hasMore 상태를 false로 설정합니다.
        if (data.length === 0) {
          setHasMore(false);
        } else {
          // 불러온 데이터를 현재 상품 목록에 추가합니다.
          // 이전 상품 목록(prevProducts)에 새로운 데이터(data.products)를 연결합니다.
          setReviews((prevReviews) => [...prevReviews, ...data]);
          
          // 페이지 번호를 업데이트하여 다음 요청에 올바른 skip 값을 사용합니다.
          setPage((prevPage) => prevPage + 1);
        }

    return (
        <>
      {reviews.map((item, index) => (
        <table
          key={index}
          style={{ width: '600px', margin: '0 auto' }}
          className={'mb-2'}
        >
          <tr>
            <td >
              <img
                src={item.memberImageUrl}
                alt="상품 이미지"
                style={{ width: '100%', margin: '10px' }}
              />
            </td>
            <td >
                <span>{item.content}</span>
                <span>${item.nick1}</span>
            </td>
          </tr>
        </table>
      ))}
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          Load More Items
        </div>
      )}

        </>
    )
}
}
export default ReviewScrollList;