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
import Review from './pages/Review';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import SelectCategory from './pages/User/CategoryServey';
import { FullScreenLayout } from './layouts/FullScreenLayout';
import Proxy from './pages/User/Proxy';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to='/user/login' />} />
            <Route path='user' element={<FullScreenLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='category-servey' element={<SelectCategory />} />
            </Route>
            <Route path='/' element={<MobileLayout />}>
              <Route path='main' element={<MainPage />} />
              <Route path='shorts' element={<Shorts />} />
              <Route path='add' element={<Add />} />
              <Route path='library/*' element={<Library />}>
                <Route index element={<Navigate replace to='before' />} />
                <Route path=':category' element={<LibrarySelectedResult />} />
              </Route>
              <Route path='mypage' element={<MyPage />} />
              <Route path='review' element={<Review />} />
            </Route>
            <Route path='proxy' element={<Proxy/>}/>
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </NavigationProvider>
    </QueryClientProvider>
  );
}

export default App;
