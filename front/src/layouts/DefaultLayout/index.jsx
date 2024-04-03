import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

export function MobileLayout() {
  useEffect(() => {
    const setAppHeight = () => {
      const appHeight = window.innerHeight * 0.9;
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${appHeight}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  width: 100%;
  height: var(--app-height, 100%);
  max-width: 456px;
  margin: 0 auto;
  padding-top: 30px;
  background-color: var(--bg-beige);
  display: flex;
  flex-direction: column;
`;
