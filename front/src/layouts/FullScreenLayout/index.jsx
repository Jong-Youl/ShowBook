import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

export function FullScreenLayout() {
  return (
    <FullLayout>
      <Outlet />
    </FullLayout>
  );
}

const FullLayout = styled.div`
  width: 100%;
  min-height: 100svh;
  max-width: 456px;
  margin: 0 auto;
  background-color: var(--bg-beige);
  display: flex;
  flex-direction: column;
  //gap: 24px;
`;
