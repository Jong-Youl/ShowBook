// Library.jsx
import { Routes, Route, Link } from 'react-router-dom';
import BeforeRead from './BeforeRead';
import NowRead from './NowRead';
import AfterRead from './AfterRead';

function Library() {
  return (
    <div>
      <h2>서재</h2>
      <nav>
        <Link to='before'>읽고 싶은 책</Link> |{' '}
        <Link to='now'>읽고 있는 책</Link> | <Link to='after'>읽은 책</Link>
      </nav>
      <Routes>
        <Route path='before' element={<BeforeRead />} />
        <Route path='now' element={<NowRead />} />
        <Route path='after' element={<AfterRead />} />
      </Routes>
    </div>
  );
}

export default Library;
