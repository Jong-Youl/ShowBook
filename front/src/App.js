import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MobileLayout } from './layouts/DefaultLayout';
import MainPage from './pages/MainPage';
import Library from './pages/Library';
import MyPage from './pages/MyPage';
import Shorts from './pages/Shorts';
import Add from './pages/Add';
import BottomNav from './layouts/BottomNav';
import { NavigationProvider } from './context/NavigationContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';
import LibrarySelectedResult from './pages/Library/LibrarySelectedResult';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MobileLayout />}>
              <Route path='main' element={<MainPage />} />
              <Route path='shorts' element={<Shorts />} />
              <Route path='add' element={<Add />} />
              <Route path='library/*' element={<Library />}>
                <Route index element={<Navigate replace to='before' />} />
                <Route path=':category' element={<LibrarySelectedResult />} />
              </Route>
              <Route path='mypage' element={<MyPage />} />
            </Route>
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </NavigationProvider>
    </QueryClientProvider>
  );
}

export default App;
