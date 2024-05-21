import React, { useCallback, useEffect, useRef } from 'react';

const InfiniteScroll = ({
  children,
  fetchNextPage,
  hasNextPage,
  scrollableTarget,
}) => {
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { root: scrollableTarget.current },
      ); // root 옵션 추가
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, scrollableTarget],
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {children}
      <div ref={lastElementRef} style={{ height: '1px' }} />
    </>
  );
};

export default InfiniteScroll;
