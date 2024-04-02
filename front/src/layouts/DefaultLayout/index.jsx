import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

export function MobileLayout() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  width: 100%;
  height: -webkit-fill-available;
  height: fill-available;
  min-height: 90svh;
  max-width: 456px;
  margin: 0 auto;
  padding-top: 30px;
  background-color: var(--bg-beige);
  display: flex;
  flex-direction: column;
`;
