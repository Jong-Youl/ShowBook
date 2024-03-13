import React from 'react';
import { Outlet } from 'react-router';
import styled from '@emotion/styled';

export const MobileLayout = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

const DefaultLayout = styled.div`
  width: 100%;
  min-height: 90vh;
  max-width: 456px;
  margin: 0 auto;
  padding: 30px 20px 20px;
  background-color: #fffdf9;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default DefaultLayout;
