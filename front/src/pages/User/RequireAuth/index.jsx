import { useRecoilValue } from 'recoil';
import { loginState } from '../../../lib/memberRecoil';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const isLoggedIn = useRecoilValue(loginState);

  if (isLoggedIn) {
    // 로그인 상태일 때 메인 페이지로 리다이렉트
    return <Navigate to="/main" replace />;
  }

  // 로그인 상태가 아닐 때는 자식 컴포넌트를 그대로 렌더링
  return children;
}

export default RequireAuth