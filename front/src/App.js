import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MobileLayout } from './layouts/DefaultLayout';
import MainPage from './pages/MainPage';
import Library from './pages/Library';
import BookSelection from './pages/Add/BookSelection';
import MyPage from './pages/MyPage';
import Shorts from './pages/Shorts';
import BottomNav from './layouts/BottomNav';
import { NavigationProvider } from './context/NavigationContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';
import LibrarySelectedResult from './pages/Library/LibrarySelectedResult';
import Review from './pages/Review';
import BookDetail from './pages/BookDetail';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import SelectCategory from './pages/User/CategorySurvey';
import { FullScreenLayout } from './layouts/FullScreenLayout';
import Proxy from './pages/User/Proxy';
import ShookCreated from './pages/Add/ShookCreated';
import ShookImageUpload from './pages/Add/ShookImageUpload';
import { Outlet } from 'react-router';
import RequireAuth from './pages/User/RequireAuth';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to='/user/login' />} />
            <Route path='user' element={<RequireAuth><FullScreenLayout /></RequireAuth>}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='category-survey' element={<SelectCategory />} />
              <Route path='proxy' element={<Proxy />} />
            </Route>
            <Route path='/' element={<MobileLayout />}>
              <Route path='main' element={<MainPage />} />
              <Route path='shorts' element={<Shorts />} />
              <Route path='add' element={<Outlet />}>
                <Route
                  index
                  element={<Navigate replace to='/add/book-selection' />}
                />
                <Route path='book-selection' element={<BookSelection />} />
                <Route path='shook-created' element={<ShookCreated />} />
                <Route path='image-selection' element={<ShookImageUpload />} />
              </Route>
              <Route path='library/*' element={<Library />}>
                <Route index element={<Navigate replace to='before' />} />
                <Route path=':category' element={<LibrarySelectedResult />} />
              </Route>
              <Route path='mypage' element={<MyPage />} />
              <Route path='review' element={<Review />} />
              <Route path='book-detail' element={<BookDetail />} />
            </Route>
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </NavigationProvider>
    </QueryClientProvider>
  );
}

export default App;
