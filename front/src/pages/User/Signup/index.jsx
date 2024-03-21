import React from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  let navigate = useNavigate();

  const handleSubmit = () => {
    // 회원가입 처리 로직
    navigate('/user/select-category');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Name' />
      <input type='number' placeholder='Age' />
      <select>
        <option value='male'>Male</option>
        <option value='female'>Female</option>
      </select>
      <input type='text' placeholder='Nickname' />
      <button type='submit'>Next</button>
    </form>
  );
}
export default Signup;
