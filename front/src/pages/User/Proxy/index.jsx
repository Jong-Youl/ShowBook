import {useState,useEffect} from 'react';
import {UserService} from '../../../api/UserService';

const userService = new UserService();

function Proxy() {
    const [memberId, setMemberId] = useState(null);

    
    /**
    useEffect는 컴포넌트가 랜더링 될 때마다 실행되고
    login함수는 useEffect함수 안에서 실행되는데
    이게 useEffect가 실행될 때마다 호출되는 것이 아니라
    memberId가 변경될 때마다 호출됩니다.

    따라서 useEffect가 실행될 때마다 memberId가 변경되어 
    이전 요청이 아니라 새로운 요청이 발생하는 것처럼 보일 수 있습니다

    따라서 useEffect 내부에서 login함수를 호출하는 것 대신 
    memberId가 변경될 때마다 login함수가 호출되도록 수정해야한다.
     */

    useEffect(() => {
        const memberIdFromURL = new URL(document.location).searchParams.get("id")
        setMemberId(memberIdFromURL)
    },[])

    // memberId가 변하면 실행
    useEffect(() => {
        if(memberId){
            userService.login(memberId)
        }
    },[memberId])

}

export default Proxy;