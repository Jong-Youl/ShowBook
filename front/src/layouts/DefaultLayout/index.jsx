import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

export function MobileLayout() {
  function setViewportProperty() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  window.addEventListener('load', setViewportProperty);
  window.addEventListener('resize', setViewportProperty);
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 90);
  height: -webkit-fill-available;
  height: fill-available;
  max-width: 456px;
  margin: 0 auto;
  padding-top: 30px;
  background-color: var(--bg-beige);
  display: flex;
  flex-direction: column;
`;
