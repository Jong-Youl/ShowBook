import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MobileLayout } from './layouts/DefaultLayout';
import MainPage from './pages/MainPage';
import Library from './pages/Library';
import MyPage from './pages/MyPage';
import Shorts from './pages/Shorts';
import Add from './pages/Add';
import BottomNav from './layouts/BottomNav';

import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MobileLayout />}>
            <Route path='main' element={<MainPage />} />
            <Route path='shorts' element={<Shorts />} />
            <Route path='add' element={<Add />} />
            <Route path='library' element={<Library />} />
            <Route path='mypage' element={<MyPage />} />
          </Route>
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
