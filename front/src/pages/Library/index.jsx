// Library.jsx
import { Routes, Route } from 'react-router-dom';
import BeforeRead from './BeforeRead';
import NowRead from './NowRead';
import AfterRead from './AfterRead';
import Navbar from './Navbar';

function Library() {
  return (
    <div>
      <h2>서재</h2>
      <Navbar></Navbar>
      <Routes>
        <Route path='before' element={<BeforeRead />} />
        <Route path='now' element={<NowRead />} />
        <Route path='after' element={<AfterRead />} />
      </Routes>
    </div>
  );
}

export default Library;
